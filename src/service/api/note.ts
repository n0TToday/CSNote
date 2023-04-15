import { mockRequest } from '../request';

export function getNoteInfoApi(noteId: string) {
  return mockRequest.get<Note.NoteInfo>(`/note/${noteId}`);
}

export function getNoteDetailApi(noteId: string) {
  return mockRequest.get<Note.NoteDetail>(`/note/${noteId}`);
}

export function createNoteApi(newNote: Note.NoteDetail) {
  return mockRequest.post<string>('/note', newNote);
}

export function deleteNoteApi(noteId: string) {
  return mockRequest.delete(`/note/${noteId}`, {});
}

export function updateNoteInfoApi(noteId: string, noteInfo: Note.NoteInfo) {
  return mockRequest.patch<Note.NoteInfo>(`/note/${noteId}`, noteInfo);
}

export function updateNoteDetailApi(noteId: string, noteDetail: Note.NoteDetail) {
  return mockRequest.patch<Note.NoteDetail>(`/note/${noteId}`, noteDetail);
}
