<script lang="ts" setup>
import type { Note } from "~/types/main";
import "~/assets/main.css";

const notes = reactive<Note[]>(getNotes());
const router = useRouter();
const confirmDeleteId = ref<number | null>(null);

function handleNoteDelete(noteId: number) {
  const index = notes.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
    deleteNote(noteId);
  }
}
</script>

<template>
  <div>
    <div class="notes-header">
      <h1>Заметки</h1>
      <div class="add-button" @click="router.push('/new-todo')">
        <span class="plus">+</span>
      </div>
    </div>
    <div class="notes-container">
      <div v-for="note in notes" class="note-wrapper">
        <div class="note">
          <div class="note-content" @click="router.push(`/${note.id}`)">
            <div class="note-header">
              <h2 class="note-title">{{ note.title }}</h2>
              <span class="date">{{ note.createdAt }}</span>
            </div>
            <ul class="todo-list">
              <li v-for="todo in note.todoList.slice(0, 3)" class="todo">
                {{ todo.title }}
              </li>
            </ul>
            <span v-if="note.todoList.length > 3" class="note-rest"
              >Ещё ({{ note.todoList.length - 3 }})</span
            >
          </div>
          <img
            class="delete-button"
            src="/icons/delete.svg"
            @click="confirmDeleteId = note.id"
          />
          <div
            :class="['confirm-delete', { active: confirmDeleteId === note.id }]"
          >
            <span @click="handleNoteDelete(note.id)">Да</span>
            <span class="confirm-text">Удалить?</span>
            <span @click="confirmDeleteId = null">Нет</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$screen-sm: 320px;
$screen-md: 375px;
$screen-lg: 425px;
$screen-xl: 768px;

$color-bg-light: #fafafa;
$color-text-dark: #000;
$color-text-muted: #777;
$color-accent: #06b6d4;
$color-accent-bg: #a5f3fc;
$color-danger: #dc2626;
$color-danger-bg: #fecaca;

.notes-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;

  .note-wrapper {
    position: relative;

    .note {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px;
      border-radius: 12px;
      background-color: $color-bg-light;
      color: $color-text-dark;

      .note-content {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        width: 100%;

        .note-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
          max-width: 100%;

          .note-title {
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .date {
            color: $color-text-muted;
          }
        }

        .todo-list .todo {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: $color-text-muted;

          &::marker {
            white-space: nowrap;
          }
        }

        .note-rest {
          padding: 2px 4px;
          border-radius: 6px;
          text-align: center;
          color: $color-accent;
          background-color: $color-accent-bg;
        }
      }

      .delete-button {
        cursor: pointer;
        flex-shrink: 0;
        width: 32px;
        height: 32px;
      }

      .confirm-delete {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        font-size: x-large;
        background-color: $color-danger;
        border-radius: 10px;
        color: transparent;
        overflow: hidden;
        transition: all 0.3s ease;

        span {
          cursor: pointer;
        }

        &.active {
          width: 100%;
          padding: 0 24px;
          color: $color-bg-light;

          @media screen and (min-width: $screen-lg) {
            width: 75%;
          }

          @media screen and (min-width: $screen-lg) {
            width: 75%;
          }
        }

        .confirm-text {
          cursor: auto;
          font-size: large;
        }
      }
    }
  }
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .add-button {
    cursor: pointer;
    display: flex;
    padding: 0 12px;
    background-color: #65a30d;
    border-radius: 4px;

    .plus {
      font-size: 24px;
    }
  }
}
</style>
