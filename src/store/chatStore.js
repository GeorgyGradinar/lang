import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const chatStore = defineStore('chat', () => {
    let messages = ref([]);
    let messageLimit = ref(null);
    let isTriggerScrollDown = ref(false);
    let isActiveGeneration = ref(false);
    let isActiveLoaderMessageGeneration = ref(false);
    let currentPage = ref(1);
    let lastPage = ref(null);
    let foundWord = ref(null);
    let isActiveSearching = ref(false);
    let triggerSaveScrollForPagination = ref(false);

    function clearChatStore() {
        messages.value = [];
        messageLimit.value = null;
        isTriggerScrollDown.value = false;
        isActiveGeneration.value = false;
        isActiveLoaderMessageGeneration.value = false;
        currentPage.value = 1;
        lastPage.value = null;
        foundWord.value = null;
        isActiveSearching.value = false;
        triggerSaveScrollForPagination.value = false;
    }

    function changeMessages(allMessages, isSeparateBotMessage = false) {
        if (isSeparateBotMessage) {
            messages.value = allMessages.map(data => {
                if (data.is_bot) {
                    return {
                        ...data,
                        message: handleMessage(data.message)
                    }
                } else {
                    return data
                }

            })
        } else {
            messages.value = allMessages
        }

        triggerScrollDown();
    }

    function addNextPageMessages(allMessages) {
        const newData = allMessages.map(data => {
            return {
                ...data,
                message: data.message.split(' ')
            }
        })

        messages.value.unshift(...newData);

        triggerSaveScrollForPagination.value = !triggerSaveScrollForPagination.value;
    }

    function handleMessage(message) {
        return message.replaceAll(/([\w']+)/ig, (substr) => `|divider|<span class="english-word">${substr}</span>|divider|`).replaceAll(' |divider|', '&nbsp;|divider|').split('|divider|');
    }

    function addNewMessage(newMessage, isBot, timestamp, isSeparateMessage) {
        let completedMessageData
        console.log(isSeparateMessage)
        if (isSeparateMessage) {
            completedMessageData = {
                is_bot: isBot,
                message: handleMessage(newMessage),
                timestamp
            }
        } else {
            completedMessageData = {
                is_bot: isBot,
                message: newMessage,
                timestamp
            }
        }

        messages.value.push(completedMessageData);
        triggerScrollDown();
    }

    function addCommentToLastPersonMessage(comments) {
        let lastMessage
        messages.value.forEach(message => {
            if (!message.is_bot) {
                lastMessage = message
            }
        })
        lastMessage.spelling_comment = comments;
    }

    function changeMessageLimit(limit) {
        messageLimit.value = limit;
    }

    function triggerScrollDown() {
        isTriggerScrollDown.value = !isTriggerScrollDown.value;
    }

    function changeActiveGeneration(isActive) {
        isActiveGeneration.value = isActive;
    }

    function changeActiveLoaderMessageGeneration(isActive) {
        isActiveLoaderMessageGeneration.value = isActive;
    }

    function changeCurrentPage(page) {
        currentPage.value = page;
    }

    function changeLastPage(page) {
        lastPage.value = page;
    }

    function changeSearchWord(word) {
        foundWord.value = word;
    }

    function changeActiveSearching(isActive) {
        isActiveSearching.value = isActive;
    }

    return {
        messages, changeMessages, addNextPageMessages, addNewMessage, addCommentToLastPersonMessage,
        messageLimit, changeMessageLimit,
        isTriggerScrollDown, triggerScrollDown,
        isActiveGeneration, changeActiveGeneration,
        isActiveLoaderMessageGeneration, changeActiveLoaderMessageGeneration,
        currentPage, changeCurrentPage,
        lastPage, changeLastPage,
        foundWord, changeSearchWord,
        isActiveSearching, changeActiveSearching,
        triggerSaveScrollForPagination,
        clearChatStore
    }
})
