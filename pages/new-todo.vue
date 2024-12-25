<script lang="ts" setup>
import type { Note } from "~/types/main";

const warning = ref(false);
const success = ref(false);
const note = reactive<Pick<Note, "title" | "todoList">>({
  title: "Название заметки",
  todoList: [
    {
      id: 1,
      title: "",
      completed: false,
    },
  ],
});

function addTodo() {
  note.todoList.push({
    id: note.todoList.length + 1,
    title: "",
    completed: false,
  });
}

function removeTodo(index: number) {
  if (note.todoList.length > 1) {
    note.todoList.splice(index, 1);
  } else {
    return;
  }
}

function resetNote() {
  note.title = "Название заметки";
  note.todoList = [
    {
      id: 1,
      title: "",
      completed: false,
    },
  ];
}

function validateNote() {
  if (note.title === "") {
    return false;
  }

  for (let todo of note.todoList) {
    if (todo.title.trim() === "") {
      return false;
    }
  }

  return true;
}

function handleNoteSave() {
  console.log(note);
  if (validateNote()) {
    console.log("note valid");
    saveNote(note);
    success.value = true;
    setTimeout(() => {
      success.value = false;
    }, 2000);
    resetNote();
  } else {
    warning.value = true;
    setTimeout(() => {
      warning.value = false;
    }, 3000);
    console.log("note invalid");
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="note-wrapper">
      <div class="header">
        <h1>Создать</h1>
        <div v-if="warning" class="warning">
          <img width="24" height="24" src="/icons/warning.svg" />
          <p class="text">Заполните все поля</p>
        </div>
      </div>
      <div class="note">
        <div class="note-title">
          <input
            autofocus
            v-model="note.title"
            placeholder="Название заметки"
            id="title"
            type="text"
            class="title-input"
          />
          <img width="24" height="24" src="/icons/pencil.svg" />
        </div>
        <div v-for="(todo, index) in note.todoList" class="todo">
          <span class="index">{{ index + 1 }}.</span>
          <input
            v-model="todo.title"
            placeholder="Задача"
            id="title"
            type="text"
            class="todo-input"
          />
          <img
            src="/icons/delete.svg"
            class="delete-button"
            @click="removeTodo(index)"
          />
        </div>
        <button class="add-button" @click="addTodo">Добавить задачу</button>
      </div>
    </div>
    <div class="footer">
      <p v-if="success" class="success-message">Заметка успешно сохранена!</p>
      <button class="save-button" @click="handleNoteSave">Сохранить</button>
      <NuxtLink to="/" class="back-button">Назад</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .warning {
      display: flex;
      align-items: center;
      gap: 8px;

      .text {
        color: #dc2626;
        font-weight: 600;
      }
    }
  }

  .note {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    color: #000;
    background-color: #fcfcfc;
    border-radius: 12px;
    padding: 12px;

    .note-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;

      .title-input {
        width: 100%;
        border: none;
        background: transparent;
        outline: transparent;
        font-size: x-large;

        &::placeholder {
          color: #000;
          font-size: large;
        }
      }
    }

    .todo {
      display: flex;
      align-items: center;
      gap: 4px;

      .index {
        font-size: medium;
        font-weight: 500;
      }
      .todo-input {
        border: none;
        border-bottom: #000 1px solid;
        width: 100%;
        font-size: medium;
        font-weight: 500;
        outline: transparent;
      }

      .delete-button {
        width: 24px;
        height: 24px;
      }
    }

    .add-button {
      font-weight: 600;
      font-size: medium;
      width: 100%;
      padding: 8px 0;
      color: #84cc16;
      border: none;
      border-radius: 6px;
      background-color: #d9f99d;
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .success-message {
      text-align: center;
      color: #65a30d;
      font-weight: 600;
    }

    .save-button {
      border: none;
      font-size: medium;
      font-weight: 600;
      border-radius: 4px;
      padding: 8px 0;
      text-align: center;
      display: inline-block;
      color: #fcfcfc;
      background-color: #65a30d;
      width: 100%;
      text-decoration: none;
    }

    .back-button {
      border-radius: 4px;
      padding: 8px 0;
      text-align: center;
      display: inline-block;
      color: #000;
      background-color: #fcfcfc;
      width: 100%;
      text-decoration: none;
    }
  }
}
</style>
