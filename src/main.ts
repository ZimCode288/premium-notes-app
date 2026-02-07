import './style.css'
import { getNotes, addNote, deleteNote, updateNote } from './logic/notes'
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

  notes.forEach((note, index) => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.setAttribute('data-id', note.id);
    card.style.animationDelay = `${index * 0.05}s`;
    
    card.innerHTML = `
      <h3>${escapeHtml(note.title || 'Untitled')}</h3>
      <p>${escapeHtml(note.content)}</p>
      <div class="note-footer">
        <span>${formatDate(note.updatedAt)}</span>
        <div class="actions">
          <button class="btn-icon btn-edit" title="Edit Note">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="btn-icon btn-delete" title="Delete Note">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.btn-edit')?.addEventListener('click', () => {
      openEditModal(note);
    });

    card.querySelector('.btn-delete')?.addEventListener('click', () => {
      if (deleteNote(note.id)) {
        renderNotes();
      }
    });

    notesGrid.appendChild(card);
  });
}

function openEditModal(note: Note) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit Note</h2>
      </div>
      <div class="modal-body">
        <input type="text" id="edit-title" value="${escapeHtml(note.title)}" placeholder="Title" />
        <textarea id="edit-content" placeholder="Content">${escapeHtml(note.content)}</textarea>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" id="cancel-edit">Cancel</button>
        <button id="save-edit">Save Changes</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const editTitleInput = modal.querySelector('#edit-title') as HTMLInputElement;
  const editContentInput = modal.querySelector('#edit-content') as HTMLTextAreaElement;
  const saveBtn = modal.querySelector('#save-edit') as HTMLButtonElement;
  const cancelBtn = modal.querySelector('#cancel-edit') as HTMLButtonElement;

  saveBtn.addEventListener('click', () => {
    const newTitle = editTitleInput.value.trim();
    const newContent = editContentInput.value.trim();

    if (!newContent) {
      editContentInput.focus();
      return;
    }

    updateNote(note.id, newTitle, newContent);
    document.body.removeChild(modal);
    renderNotes();
  });

  cancelBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
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
