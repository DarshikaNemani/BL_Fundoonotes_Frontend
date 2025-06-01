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

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.noteAdded.emit(this.noteForm.value);
      this.noteForm.reset();
    }
  }
}
