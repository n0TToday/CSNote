import { request } from '../request';

export function getNoteListApi() {
  return request.get<object[]>(`/note`);
}
export function getFastNoteListApi() {
  return request.get<Note.FastNoteList[]>(`/note?type=fast`);
}
export function getDelNoteListApi() {
  return request.get<Note.DelNoteList[]>(`/note?type=del`);
}
export function getStarNoteListApi() {
  return request.get<Note.StarNoteList[]>(`/note?type=star`);
}
export function getArchNoteListApi() {
  return request.get<Note.ArchNoteList[]>(`/note?type=arch`);
}
export function getShareNoteListApi() {
  return request.get<Note.ShareNoteList[]>(`/note?type=share`);
}

export function getNoteApi(noteId: string) {
  return request.get<Note.NoteDetail>(`/note/${noteId}`);
}

export function createNoteApi(newNote: Note.NoteDetail) {
  return request.post<string>('/note', newNote);
}

export function deleteNoteApi(noteId: string) {
  return request.delete(`/note/${noteId}`, {});
}

export function updateNoteApi(noteId: string, type: string, noteDetail?: Note.NoteDetail) {
  return request.put<Note.NoteDetail>(`/note/${noteId}?type=${type}`, noteDetail);
}
