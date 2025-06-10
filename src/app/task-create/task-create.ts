import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task/task.model';
import { TaskService } from '../services/task.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-create.html',
  styleUrls: ['./task-create.scss']
})
export class TaskCreate implements OnInit {
  newTask: Partial<Task> = {
    title: '',
    description: '',
    completed: false,
  };


  constructor(private taskService: TaskService, public router: Router) {}

  isSubmitting = false;
  errorMessage: string | null = null;


  ngOnInit(): void {}

  onSubmit(): void {
    if(!this.newTask.title?.trim()){
      this.errorMessage = 'O título é obrigatório.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    this.taskService.create(this.newTask as Task).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        this.errorMessage = `Erro ao criar tarefa: ${error.message}`;
        this.isSubmitting = false;
      }
    });

  }

}
