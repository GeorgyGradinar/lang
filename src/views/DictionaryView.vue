<template>
  <div class="wrapper-dictionary-page">
    <DictView/>
    <ThemsView/>
  </div>
  <MiniChat></MiniChat>
</template>

<script setup>
import DictView from '@/components/widgets/DictView.vue';
import ThemsView from '@/components/widgets/ThemsView.vue';
import MiniChat from "@/components/widgets/MiniChat";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {onMounted, onUnmounted} from "vue";
import {dictionaryStore} from "@/store/dictionaryStore";

const {getGroups, getAllUsersWords} = dictionaryRequests();
const dictionary = dictionaryStore();
const {clearDictionaryStore} = dictionary;

onMounted(() => {
  clearDictionaryStore();

  getGroups();
  getAllUsersWords();
})

onUnmounted(() => {
  clearDictionaryStore();
})
</script>

<style scoped lang="scss">
.wrapper-dictionary-page {
  height: 100%;
  min-height: 100vh;
  background-color: var(--white);
}
</style>
