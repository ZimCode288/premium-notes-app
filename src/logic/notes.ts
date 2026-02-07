export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

const STORAGE_KEY = 'premium-notes-data';

export const getNotes = (): Note[] => {
  if (typeof localStorage === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveNotes = (notes: Note[]) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const addNote = (title: string, content: string): Note => {
  const notes = getNotes();
  const newNote: Note = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    title,
    content,
    updatedAt: Date.now(),
  };
  notes.unshift(newNote);
  saveNotes(notes);
  return newNote;
};

export const updateNote = (id: string, title: string, content: string): Note | null => {
  const notes = getNotes();
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return null;
  
  notes[index] = {
    ...notes[index],
    title,
    content,
    updatedAt: Date.now(),
  };
  saveNotes(notes);
  return notes[index];
};

export const deleteNote = (id: string): boolean => {
  const notes = getNotes();
  const filtered = notes.filter(n => n.id !== id);
  if (filtered.length === notes.length) return false;
  saveNotes(filtered);
  return true;
};
