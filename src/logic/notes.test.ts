import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getNotes, addNote, updateNote, deleteNote, Note } from './notes';

describe('Notes Logic', () => {
  beforeEach(() => {
    // Mock localStorage
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { for (const key in store) delete store[key]; }
    });
  });

  it('should add a note', () => {
    const note = addNote('Test Title', 'Test Content');
    expect(note.title).toBe('Test Title');
    expect(note.content).toBe('Test Content');
    expect(getNotes().length).toBe(1);
  });

  it('should update a note', () => {
    const note = addNote('Old Title', 'Old Content');
    const updated = updateNote(note.id, 'New Title', 'New Content');
    expect(updated?.title).toBe('New Title');
    expect(getNotes()[0].title).toBe('New Title');
  });

  it('should delete a note', () => {
    const note = addNote('To be deleted', '...');
    const success = deleteNote(note.id);
    expect(success).toBe(true);
    expect(getNotes().length).toBe(0);
  });
});
