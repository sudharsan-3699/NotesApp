import axios from 'axios';
export const API_BASE = 'http://192.168.2.5:8000/api';

export const getNotes=()=>axios.get(`${API_BASE}/notes/`).then(r=>r.data);

export const createNote = (note: {title: string; content: string; tags: string}) =>
  axios.post(`${API_BASE}/notes/`, note).then(r => r.data);

export const updateNote = (id: number, note:{title:string;content:string;tags:string}) =>
  axios.put(`${API_BASE}/notes/${id}/`, note).then(r => r.data);

export const deleteNote = (id: number) =>
  axios.delete(`${API_BASE}/notes/${id}/`);

