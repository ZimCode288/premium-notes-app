import './style.css'
import { getNotes, addNote, deleteNote } from './logic/notes'
import type { Note } from './logic/notes'

const titleInput = document.getElementById('note-title') as HTMLInputElement;
const contentInput = document.getElementById('note-content') as HTMLTextAreaElement;
const addBtn = document.getElementById('add-note-btn') as HTMLButtonElement;
const notesGrid = document.getElementById('notes-grid') as HTMLElement;

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(timestamp));
}

function renderNotes() {
  const notes = getNotes();
  notesGrid.innerHTML = '';

  notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.setAttribute('data-id', note.id);
    
    card.innerHTML = `
      <h3>${escapeHtml(note.title || 'Untitled')}</h3>
      <p>${escapeHtml(note.content)}</p>
      <div class="note-footer">
        <span>${formatDate(note.updatedAt)}</span>
        <div class="actions">
          <button class="btn-icon btn-delete" title="Delete Note">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.btn-delete')?.addEventListener('click', () => {
      if (deleteNote(note.id)) {
        renderNotes();
      }
    });

    notesGrid.appendChild(card);
  });
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

addBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!content) {
    contentInput.focus();
    return;
  }

  addNote(title, content);
  titleInput.value = '';
  contentInput.value = '';
  renderNotes();
});

// Initial render
renderNotes();
