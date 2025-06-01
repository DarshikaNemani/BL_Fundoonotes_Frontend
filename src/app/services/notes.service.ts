import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes/getNotesList`, {
      headers: this.getHeaders()
    });
  }

  createNote(note: Note): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes/addNotes`, note, {
      headers: this.getHeaders()
    });
  }

  updateNote(noteId: string, note: Note): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes/updateNotes/${noteId}`, note, {
      headers: this.getHeaders()
    });
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notes/trashNotes/${noteId}`, {
      headers: this.getHeaders()
    });
  }
}
