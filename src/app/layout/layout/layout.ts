import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavBar, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
}