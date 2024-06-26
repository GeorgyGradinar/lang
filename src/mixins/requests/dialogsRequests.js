import axios from "axios";
import {ERROR_SOME_THING_WRONG, ERROR_TO_MANY_REQUESTS, HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {chatStore} from "@/store/chatStore";
import {tasksStore} from "@/store/tasksStore";
import shared from "@/mixins/shared";
import taskRequests from "@/mixins/requests/taskRequests";
import {useRouter} from "vue-router/dist/vue-router";
import {LESSON} from "@/configuration/Routers";
import {notificationStore} from "@/store/notificationStore";

export default function dialogsRequests() {
    const router = useRouter();
    const chat = chatStore()
    const {
        changeMessages,
        changeMessageLimit,
        addNewMessage,
        changeActiveGeneration,
        changeActiveLoaderMessageGeneration,
        changeLastPage,
        addNextPageMessages,
        addCommentToLastPersonMessage
    } = chat;
    const taskStore = tasksStore();
    const {changeIsOpenDialog, changeIsOpenRejectDialog, changeStatusCurrentTask} = taskStore;
    const {taskShow} = taskRequests();
    const {prepareForLogout} = shared();
    const notifications = notificationStore();
    const {openSnackBarReject} = notifications;

    function getMessages(isPagination) {
        axios.get(`${testUrl}/api/user/dialog?page=${chat.currentPage}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (isPagination) {
                    addNextPageMessages(response.data.data);
                } else {
                    changeMessages(response.data.data);
                    changeMessageLimit(response.data.message_limit);
                    changeLastPage(response.data.pagination.last_page);
                }
            })
            .catch(error => handleError(error))
    }

    function getAllMessagesInTask(id, isPagination) {
        changeActiveLoaderMessageGeneration(true);
        axios.get(`${testUrl}/api/user/tasks/messages?user_task_id=${id}&page=${chat.currentPage}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (router.currentRoute.value.path !== LESSON) return;

                if (isPagination) {
                    addNextPageMessages(response.data.data);
                } else {
                    if (response.data.data.length) {
                        taskShow(id);
                        changeMessages(response.data.data, true);
                        changeLastPage(response.data.pagination.last_page);
                        changeActiveLoaderMessageGeneration(false);
                    } else {
                        setTimeout(() => {
                            getAllMessagesInTask(id, isPagination);
                        }, 1500);
                    }
                }
            })
            .catch(error => handleError(error))
    }

    function sendMessage(message) {
        axios.post(`${testUrl}/api/user/dialog/message/send`, {
            message: message
        }, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                getMessageFormNetwork(response.data.message_id, response);
            })
            .catch(error => handleError(error))
    }

    function sendMessageToTask(message) {
        axios.post(`${testUrl}/api/user/tasks/messages/send`, {
            text: message,
            user_task_id: taskStore.currentTask.id
        }, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                getMessageFromTask(response.data.task_message_id);
            })
            .catch(error => handleError(error))
    }

    function getMessageFromTask(id) {
        axios.get(`${testUrl}/api/user/tasks/messages/get?task_message_id=${id}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (router.currentRoute.value.path !== LESSON) return;

                if (response.data.data[2]?.message_status === "processing") {
                    if (response.data.data[0].spelling_comment) addCommentToLastPersonMessage(response.data.data[0]);
                    setTimeout(() => {
                        getMessageFromTask(id)
                    }, 1000);
                } else {
                    addNewMessage(response.data.data[1].message, response.data.data[2].message_id, true, response.data.data?.date, true);
                    addCommentToLastPersonMessage(response.data.data[0]);
                    if (response.data.data[2]?.task_status !== 'processing') {
                        if (response.data.data[2]?.task_status === 'success') changeIsOpenDialog(true);
                        if (response.data.data[2]?.task_status === 'failed') changeIsOpenRejectDialog(true);
                        changeStatusCurrentTask(response.data.data[2]?.task_status)
                    }
                    changeActiveGeneration(false);
                }
            })
            .catch(error => handleError(error))
    }

    function getMessageFormNetwork(id) {
        axios.get(`${testUrl}/api/user/dialog/message/get?message_id=${id}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (router.currentRoute.value.path === LESSON) return;

                if (response.data.data?.status === "processing") {
                    setTimeout(() => {
                        getMessageFormNetwork(id)
                    }, 1000);
                } else {
                    addNewMessage(response.data.data.response, response.data.data.id, true, response.data.data.date, false);
                    changeActiveGeneration(false);
                }

            })
            .catch(error => handleError(error))
    }

    function deleteMessages() {
        axios.delete(`${testUrl}/api/user/dialog`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => handleError(error))
    }

    function handleError(error) {
        changeActiveLoaderMessageGeneration(false);
        changeActiveGeneration(false);

        switch (error.response?.status) {
            case 401:
                prepareForLogout();
                break;
            case 500:
            case 404:
                openSnackBarReject(ERROR_SOME_THING_WRONG);
                break;
            case 429:
                openSnackBarReject(ERROR_TO_MANY_REQUESTS);
                break;
            case 503:
            case 422:
            case 409:
                openSnackBarReject(error.response?.data?.message);
        }
    }

    return {
        getMessages,
        getAllMessagesInTask,
        sendMessage,
        sendMessageToTask,
        getMessageFormNetwork,
        deleteMessages
    }
}
