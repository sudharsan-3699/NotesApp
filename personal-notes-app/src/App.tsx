import React, { useEffect, useState } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from './api';
import { Note } from './types.js';
import './App.css';

const emptyNote = { title: "", content: "", tags: "" };

function App() {
  const [notes, setNotes]=useState<Note[]>([]);
  const [form, setForm]=useState(emptyNote);
  const [editingId,setEditingId]=useState<number | null>(null);

  const loadNotes = () => fetchNotes().then(setNotes);

  useEffect(() => { loadNotes(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      await updateNote({ ...form, id: editingId, created: "", updated: "" } as Note);
      setEditingId(null);
    } else {
      await createNote(form);
    }
    setForm(emptyNote); loadNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setForm({ title: note.title, content: note.content, tags: note.tags });
  };

  const handleDelete = async (id: number, title: string) => {
  const confirmed = window.confirm(`Are you sure you want to permanently delete "${title}"?`);
  if (!confirmed) return;

  try {
    await deleteNote(id);
    await loadNotes();
    window.alert(`"${title}" Deleted!`);
  } catch {
    window.alert("Error deleting the note.");
  }
};


  return (
    <div className="app-container">
      <h1>Personal Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title" placeholder="Title"
          value={form.title} onChange={handleChange} required
        />
        <input
          name="tags"
          placeholder="Tags"
          value={form.tags}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          rows={3}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Note</button>
        {editingId && <button type="button" onClick={() => {
          setEditingId(null); setForm(emptyNote);
        }}>Cancel</button>}
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.title}</strong> {note.tags && (<span>({note.tags})</span>)}
            <p>{note.content}</p>
            <em>Updated: {new Date(note.updated).toLocaleString()}</em>
            <div>
              <button className="btn-edit" onClick={() => handleEdit(note)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(note.id, note.title)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;