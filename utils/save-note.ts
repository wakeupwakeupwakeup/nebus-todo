import type { Note } from "~/types/main";

function generateId(notes: Note[]) {
  return notes.reduce((max, note) => (note.id > max ? note.id : max), 0) + 1;
}

export default (note: Partial<Note>, id?: number) => {
  const savedNotes = localStorage.getItem("notes");
  const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];

  if (id) {
    const noteIndex = notes.findIndex((existingNote) => existingNote.id === id);
    if (noteIndex !== -1) {
      notes[noteIndex] = note as Note;
    } else {
      throw new Error(`Нет заметки с ID ${id}`);
    }
  } else {
    note.id = generateId(notes);
    note.createdAt = new Date().toLocaleDateString("ru-RU");
    notes.push(note as Note);
  }

  localStorage.setItem("notes", JSON.stringify(notes));
};
