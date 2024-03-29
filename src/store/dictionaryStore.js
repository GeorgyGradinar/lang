import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const dictionaryStore = defineStore('dictionary', () => {
    let words = ref([]);
    let groups = ref([]);
    let groupWords = ref([]);
    let selectedGroupWords = ref(null);
    let isSearching = ref(false);
    let isActiveLoading = ref(false);
    let isActiveGroupWordLoader = ref(false);
    let isShowWordsTypeList = ref(false);

    //sort
    const ALFABET_SORT = {
        title: 'по алфавиту',
        type: 'word'
    };
    const PROGRESS_SORT = {
        title: 'по прогрессу',
        type: 'translation'
    };
    let sortUserWords = ref(ALFABET_SORT);

    //pagination
    let allPagesWordInGroup = ref(null);
    let currentPageWordsInGroup = ref(1);

    function clearDictionaryStore() {
        groups.value = [];
        groupWords.value = [];
        selectedGroupWords.value = null;
        isActiveLoading.value = false;
        isActiveGroupWordLoader.value = false;
        isShowWordsTypeList.value = false;
        clearForSearching();
        clearPagination();
    }

    function clearForSearching() {
        words.value = [];
        isSearching.value = false;
    }

    function clearPagination() {
        allPagesWordInGroup.value = null;
        currentPageWordsInGroup.value = 1;
    }

    function changeWords(newWords) {
        words.value = newWords;
    }

    function deleteWord(deleteId) {
        const index = words.value.findIndex(data => data.word.id === deleteId);
        words.value.splice(index, 1);
    }

    function changeGroups(newGroups) {
        groups.value = newGroups;
    }

    function changeGroupWords(newWords) {
        groupWords.value = newWords;
    }

    function addWordsToGroupWords(newWords) {
        groupWords.value = [...groupWords.value, ...newWords];
    }

    function changeSelectedGroup(group) {
        selectedGroupWords.value = group;
    }

    function changeSortTypeUserWords(type) {
        sortUserWords.value = type;
    }

    function changeAllPagesWordsInGroup(allPages) {
        allPagesWordInGroup.value = allPages;
    }

    function changeCurrentPageWordsInGroup(currentPage) {
        currentPageWordsInGroup.value = currentPage;
    }

    function changeIsSearch(isSearched) {
        isSearching.value = isSearched;
    }

    function toggleActiveLoader(isActive) {
        isActiveLoading.value = isActive;
    }

    function toggleActiveGroupWordsLoader(isActive) {
        isActiveGroupWordLoader.value = isActive;
    }

    function toggleTypeShowWords(isList) {
        isShowWordsTypeList.value = isList;
    }

    return {
        words, changeWords, deleteWord,
        groups, changeGroups,
        groupWords, changeGroupWords, addWordsToGroupWords,
        selectedGroupWords, changeSelectedGroup,
        PROGRESS_SORT, ALFABET_SORT, sortUserWords, changeSortTypeUserWords,
        allPagesWordInGroup, changeAllPagesWordsInGroup,
        currentPageWordsInGroup, changeCurrentPageWordsInGroup,
        isSearching, changeIsSearch,
        isActiveLoading, toggleActiveLoader,
        isActiveGroupWordLoader, toggleActiveGroupWordsLoader,
        isShowWordsTypeList, toggleTypeShowWords,
        clearDictionaryStore, clearForSearching, clearPagination
    }
})
