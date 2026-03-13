import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear = signal(new Date().getFullYear());
  appVersion = signal('v1.0.0');
}
