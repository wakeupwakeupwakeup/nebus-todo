export default (noteId: number) => {
  const notes = getNotes();
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  notes.splice(noteIndex, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
};
