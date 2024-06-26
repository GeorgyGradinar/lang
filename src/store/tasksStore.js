import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const tasksStore = defineStore('taskStore', () => {
    let allTasks = ref(null);
    let userTasks = ref(null);
    let currentTask = ref(null);
    let pagination = ref(null);
    let isOpenFinalModal = ref(false);
    let isOpenRejectModal = ref(false);
    let userErrors = ref(null);

    function clearTasksStore() {
        allTasks.value = null;
        userTasks.value = null;
        currentTask.value = null;
        pagination.value = null;
        isOpenFinalModal.value = false;
        isOpenRejectModal.value = false;
        userErrors.value = null;
    }

    function changeTasks(tasks) {
        allTasks.value = tasks;
    }

    function changeUserTasks(tasks) {
        userTasks.value = tasks
    }

    function addToUserTasks(tasks) {
        userTasks.value = [...userTasks.value, ...tasks];
    }

    function changeCurrentTask(task) {
        currentTask.value = task;
    }

    function changeStatusCurrentTask(status) {
        if (currentTask.value?.status) currentTask.value.status = status
    }

    function changePagination(data) {
        pagination.value = data;
    }

    function changeIsOpenDialog(isOpen) {
        isOpenFinalModal.value = isOpen;
    }

    function changeIsOpenRejectDialog(isOpen) {
        isOpenRejectModal.value = isOpen;
    }

    function changeUsersErrors(errors) {
        userErrors.value = errors;
    }

    return {
        allTasks, changeTasks,
        userTasks, changeUserTasks, addToUserTasks,
        currentTask, changeCurrentTask, changeStatusCurrentTask,
        pagination, changePagination,
        isOpenFinalModal, changeIsOpenDialog,
        isOpenRejectModal, changeIsOpenRejectDialog,
        userErrors, changeUsersErrors,
        clearTasksStore
    }
})
