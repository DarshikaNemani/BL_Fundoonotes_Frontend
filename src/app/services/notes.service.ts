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

    if (!token) {
      throw new Error('No authentication token found');
    }
    
    return new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
  }

  private getMultipartHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Don't set Content-Type for multipart/form-data, let browser set it with boundary
    return new HttpHeaders({
      'Authorization': token
    });
  }

  getAllNotes(): Observable<any> {
    const headers = this.getHeaders();
    
    return this.http.get(`${this.baseUrl}/notes/getNotesList`, {
      headers: headers
    });
  }

  createNote(note: Note): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes/addNotes`, note, {
      headers: this.getHeaders()
    });
  }

  updateNote(noteId: string, title: string, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('noteId', noteId);
    formData.append('title', title);
    formData.append('description', description);

    return this.http.post(`${this.baseUrl}/notes/updateNotes`, formData, {
      headers: this.getMultipartHeaders()
    });
  }

  // Soft delete - mark note as deleted
  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notes/trashNotes/${noteId}`, {
      headers: this.getHeaders()
    });
  }
}
