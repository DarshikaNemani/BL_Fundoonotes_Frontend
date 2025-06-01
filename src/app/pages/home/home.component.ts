import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NoteCardComponent } from '../../shared/note-card/note-card.component';
import { NoteFormComponent } from '../../shared/note-form/note-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NavbarComponent, NoteCardComponent, NoteFormComponent]
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getAllNotes().subscribe({
      next: (response) => {
        this.notes = response.data?.data || [];
      },
      error: (error) => console.error('Failed to load notes:', error)
    });
  }

  addNote(noteData: any): void {
    this.notesService.createNote(noteData).subscribe({
      next: (response) => {
        this.loadNotes();
      },
      error: (error) => console.error('Failed to add note:', error)
    });
  }

  editNote(note: Note): void {
    console.log('Edit note:', note);
  }

  deleteNote(noteId: string): void {
    this.notesService.deleteNote(noteId).subscribe({
      next: (response) => {
        this.loadNotes();
      },
      error: (error) => console.error('Failed to delete note:', error)
    });
  }
}
