import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export interface ConfirmData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css'
})
export class ConfirmModal {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModal>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
