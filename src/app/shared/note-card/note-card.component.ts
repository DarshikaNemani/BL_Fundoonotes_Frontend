import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() editNote = new EventEmitter<Note>();
  @Output() deleteNote = new EventEmitter<string>();

  onEdit(): void {
    this.editNote.emit(this.note);
  }

  onDelete(): void {
    if (this.note.id) {
      this.deleteNote.emit(this.note.id);
    }
  }
}
