import type { Note } from "~/types/main";

export default (noteId: number): Note => {
  const notes = getNotes();
  return notes.find((note) => note.id === noteId);
};
