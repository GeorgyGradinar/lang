<template>
  <div class="tasks-list">
    <h4>Список заданий</h4>
    <div class="task" v-for="task in allTasks" :key="task.id">
      <p>{{ task.title }}</p>
      <button @click="startSelectedTask(task)">Начать</button>
    </div>
  </div>

  <ShowWordsForTask v-if="isOpenWordList" @hiddenBlock="toggleOpenWordsList"></ShowWordsForTask>
</template>

<script setup>
import ShowWordsForTask from "@/components/modals/ShowWordsForTask";
import taskRequests from "@/mixins/requests/taskRequests";
import {onMounted, ref} from "vue";
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";

const {getAllTasks, taskStart} = taskRequests();
const taskStore = tasksStore();
const {allTasks} = storeToRefs(taskStore);

let isOpenWordList = ref(false);

onMounted(() => {
  getAllTasks();
})

function startSelectedTask(task) {
  if (task.type.title === "Тренировка слова") {
    toggleOpenWordsList(true);
  } else {
    taskStart(task.id);
  }
}

function toggleOpenWordsList(isOpen) {
  isOpenWordList.value = isOpen;
}
</script>

<style scoped lang="scss">
.tasks-list {
  max-height: 330px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  padding: 20px 25px;
  border-radius: 10px;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--light_pink);
  overflow: auto;

  h4 {
    color: var(--dark-pink);
    font-size: 20px;
    font-weight: 900;
  }

  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid var(--dark-pink);
    background-color: var(--pink);
    transition: all 0.2s;

    &:hover {
      background-color: var(--light_pink);

      p {
        color: var(--dark-pink);
      }
    }

    p {
      color: var(--yellow);
      font-weight: 800;
    }

    button {
      padding: 5px 10px;
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;
      color: var(--light-yellow);
      background-color: var(--dark-pink);

      &:hover {
        background-color: var(--pink);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }
  }
}

@media screen and (min-width: 2200px) {
  .tasks-list {
    max-height: 450px;

    h4 {
      font-size: 35px;
    }

    .task {
      p {
        font-size: 23px;
      }

      button {
        font-size: 20px;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .tasks-list {
    max-height: 400px;
    padding: 20px 10px;
  }
}

@media screen and (max-width: 700px) {
  .tasks-list {
    width: 100%;
  }
}
</style>
