import { Note } from './types';

const API_BASE = 'http://192.168.2.5:8000/api';

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${API_BASE}/notes/`);
  return res.json();
}

export async function createNote(note: Omit<Note,'id'|'created'|'updated'>): Promise<Note> {
  const res = await fetch(`${API_BASE}/notes/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(note: Note): Promise<Note> {
  const res = await fetch(`${API_BASE}/notes/${note.id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(noteId: number): Promise<void> {
  await fetch(`${API_BASE}/notes/${noteId}/`, { method: 'DELETE' });
}
