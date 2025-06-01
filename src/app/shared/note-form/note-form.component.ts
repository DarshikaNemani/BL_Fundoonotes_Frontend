import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {
  @Output() noteAdded = new EventEmitter<any>();
  noteForm: FormGroup;
  isExpanded = false;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  expandForm(): void {
    this.isExpanded = true;
  }

  onSubmit(): void {
    const formValue = this.noteForm.value;
    
    if (formValue.title?.trim() || formValue.description?.trim()) {
      const noteData = {
        title: formValue.title?.trim() || '',
        description: formValue.description?.trim() || ''
      };
      
      this.noteAdded.emit(noteData);
      this.noteForm.reset();
      this.isExpanded = false;
    } else {

      this.isExpanded = false;
    }
  }

  closeForm(): void {
    this.isExpanded = false;
    this.noteForm.reset();
  }
}
