<script lang="ts" setup>
import type { Note } from "~/types/main";

const { id } = useRoute().params;
const router = useRouter();
const note = reactive<Note>(getNote(parseInt(id as string)));
const bufferNote = JSON.parse(JSON.stringify(note));
const isEditing = ref(false);
const isChanges = ref(false);

watch([note], () => {
  isChanges.value = !isNotesEqual(note, bufferNote);
});

function handleDone(todoId: number) {
  const todo = note.todoList.find((todo) => todo.id === todoId);
  if (todo) todo.completed = !todo.completed;
}

function handleEdit() {
  isEditing.value = !isEditing.value;
}

function handleEditOff() {
  if (isChanges.value) {
    const confirmed = confirm(
      "Вы действительно хотите выйти? Все несохраненные изменения будут потеряны."
    );
    if (confirmed) {
      isChanges.value = false;
      handleEdit();
    }
  } else {
    handleEdit();
  }
}

function handleUndo() {
  Object.assign(note, JSON.parse(JSON.stringify(bufferNote)));
}

function handleDeleteNote() {
  const confirmed = confirm("Вы действительно хотите удалить заметку?");
  if (confirmed) {
    deleteNote(parseInt(id as string));
    router.push("/");
  }
  return;
}

function handleNoteSave() {
  saveNote(note, parseInt(id as string));
  isChanges.value = false;
  handleEdit();
}

function addTodo() {
  note.todoList.push({
    id: note.todoList.length + 1,
    title: "",
    completed: false,
  });
}
</script>

<template>
  <div class="wrapper">
    <div class="note-wrapper">
      <div class="header">
        <h1>Заметка</h1>
        <div class="controlls">
          <img
            v-if="isChanges"
            height="20"
            width="20"
            src="/icons/undo.svg"
            class="undo-button"
            @click="handleUndo"
          />
          <button v-if="!isEditing" class="button" @click="handleEdit">
            Редактировать
            <img height="20" width="20" src="/icons/pencil-white.svg" />
          </button>
          <button v-else class="button cancel" @click="handleEditOff">
            Отмена
            <img height="20" width="20" src="/icons/close-white.svg" />
          </button>
        </div>
      </div>
      <div class="note">
        <div class="header">
          <textarea
            v-model="note.title"
            :class="['title', { disabled: !isEditing }]"
          />
          <span class="date">{{ note.createdAt }}</span>
        </div>
        <div class="todo-list">
          <div
            v-for="(todo, index) in note.todoList"
            :key="todo.id"
            class="todo"
          >
            <span class="index">{{ index + 1 }}.</span>
            <textarea
              v-model="todo.title"
              placeholder="Задача"
              :class="['title', { done: todo.completed, disabled: !isEditing }]"
            />
            <div class="checkbox">
              <input
                type="checkbox"
                :id="'todo-' + todo.id"
                @change="handleDone(todo.id)"
              />
              <label :for="'todo-' + todo.id"></label>
            </div>
          </div>
          <button v-if="isEditing" class="add-button" @click="addTodo">
            Добавить задачу
          </button>
        </div>
      </div>
      <img
        v-if="!isEditing"
        width="32"
        height="32"
        src="/icons/delete.svg"
        class="delete-button"
        @click="handleDeleteNote"
      />
      <button v-else-if="isChanges" class="save-button" @click="handleNoteSave">
        Сохранить
      </button>
    </div>
    <div class="footer">
      <NuxtLink to="/" class="back-button">Назад</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;
}
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .controlls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button {
        justify-self: end;
        margin-left: auto;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border: none;
        font-size: medium;
        font-weight: 600;
        border-radius: 4px;
        text-align: center;
        color: #fcfcfc;
        background-color: #65a30d;

        &.cancel {
          background-color: #dc2626;
        }
      }
    }
  }

  .note-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .note {
      color: #000;
      background-color: #fcfcfc;
      border-radius: 16px;
      padding: 16px;

      .header {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: start;
        .title {
          field-sizing: content;
          overflow: hidden;
          white-space: pre-wrap;
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
        .date {
          color: #777;
        }
      }

      .todo-list {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .todo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          .index {
            align-self: self-start;
          }

          .title {
            field-sizing: content;
            overflow: hidden;
            height: auto;
            min-height: 24px;
            resize: none;
            border: none;
            width: 100%;
            font-size: larger;
            font-weight: 500;
            outline: transparent;
            white-space: pre-wrap;
            overflow-wrap: break-word;

            &.done {
              color: #777;
              text-decoration: line-through;
            }
          }

          .checkbox {
            position: relative;

            input {
              display: none;
            }

            label {
              display: inline-block;
              width: 24px;
              height: 24px;
              cursor: pointer;
              border-radius: 100%;
              border: 1px solid #84cc16;
              position: relative;
            }

            input:checked + label::after {
              content: "";
              position: absolute;
              top: 0px;
              left: 0px;
              width: 24px;
              height: 24px;
              background-image: url("/icons/check.svg");
              background-size: contain;
              background-repeat: no-repeat;
              background-color: #84cc16;
              border-radius: 100%;
            }
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
    }

    .delete-button {
      margin: 0 auto;
    }

    .save-button {
      cursor: pointer;
      padding: 8px 12px;
      border: none;
      font-size: medium;
      font-weight: 600;
      border-radius: 4px;
      text-align: center;
      color: #fcfcfc;
      background-color: #65a30d;
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 8px;

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
