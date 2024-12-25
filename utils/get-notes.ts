import type { Note } from "~/types/main";

export default (): Note[] | [] => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};
