<template>
  <div class="wrapper-group-words" v-if="groupWords.length">
    <h3>Слова из словаря </h3>
    <div class="wrapper-words" :class="{'list-show': isShowWordsTypeList}">
      <WordCard v-for="word in groupWords" :key="word.id"
                :wordData="word">
      </WordCard>
    </div>
    <ButtonMoreWords v-if="currentPageWordsInGroup !== allPagesWordInGroup"
                     :active-loader="isActiveGroupWordLoader">
    </ButtonMoreWords>
  </div>

  <LoaderSpiner v-if="!groupWords.length && isActiveGroupWordLoader"></LoaderSpiner>
</template>

<script setup>
import WordCard from "@/components/widgets/WordCard";
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import ButtonMoreWords from "@/components/dictionary/ButtonMoreWords";

const dictionary = dictionaryStore();
const {
  groupWords,
  isActiveGroupWordLoader,
  isShowWordsTypeList,
  currentPageWordsInGroup,
  allPagesWordInGroup
} = storeToRefs(dictionary);
</script>

<style scoped lang="scss">
.wrapper-group-words {
  width: 100%;
  padding-top: 60px;

  h3 {
    font-size: 25px;
    font-weight: 800;
    color: var(--dark);
  }

  .wrapper-words {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding-top: 20px;
    transition: all 1s;
  }

  .list-show {
    justify-content: center;
  }
}
</style>
