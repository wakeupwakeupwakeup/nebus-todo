import type { Note } from "~/types/main";

export default (oldNote: Note, newNote: Note): boolean => {
  console.log(oldNote, newNote);

  return JSON.stringify(oldNote) === JSON.stringify(newNote);
};
