import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NoteCardComponent } from '../../shared/note-card/note-card.component';
import { NoteFormComponent } from '../../shared/note-form/note-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NoteCardComponent, NoteFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  allNotes: Note[] = [];

  constructor(private notesService: NotesService) {
    console.log('HomeComponent constructor called');
  }

  ngOnInit(): void {
    console.log('HomeComponent ngOnInit called');
    this.loadNotes();
  }

  loadNotes(): void {
    console.log('loadNotes() method called');
    this.notesService.getAllNotes().subscribe({
      next: (response) => {
        console.log('Notes response:', response);
        this.allNotes = response.data?.data || [];

        this.notes = this.allNotes.filter(note => !note.isDeleted);
        
        console.log('All notes:', this.allNotes);
        console.log('Active notes (not deleted):', this.notes);
      },
      error: (error) => console.error('Failed to load notes:', error)
    });
  }

  addNote(noteData: any): void {
    this.notesService.createNote(noteData).subscribe({
      next: (response) => {
        console.log('Note added:', response);
        this.loadNotes();
      },
      error: (error) => console.error('Failed to add note:', error)
    });
  }

  editNote(updateData: {noteId: string, title: string, description: string}): void {
    console.log('Updating note:', updateData);
    
    this.notesService.updateNote(updateData.noteId, updateData.title, updateData.description).subscribe({
      next: (response) => {
        console.log('Note updated:', response);
        
        const noteIndex = this.notes.findIndex(note => note.id === updateData.noteId);
        if (noteIndex !== -1) {
          this.notes[noteIndex].title = updateData.title;
          this.notes[noteIndex].description = updateData.description;
        }
        
      },
      error: (error) => {
        console.error('Failed to update note:', error);
        alert('Failed to update note. Please try again.');
      }
    });
  }

  deleteNote(noteId: string): void {
    console.log('Deleting note with ID:', noteId);
    
    this.notesService.deleteNote(noteId).subscribe({
      next: (response) => {
        console.log('Note moved to trash:', response);
        
        this.notes = this.notes.filter(note => note.id !== noteId);
      },
      error: (error) => {
        console.error('Failed to delete note:', error);
        alert('Failed to delete note. Please try again.');
      }
    });
  }
}
