import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskList } from './task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend';
}
