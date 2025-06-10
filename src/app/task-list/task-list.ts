import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task/task.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private taskService: TaskService, public router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.taskService.findAll().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = `Error fetching tasks: ${error.message}`;
        this.isLoading = false;
      }
    });
  }

  deleteTask(taskId: number): void {
    // Não é necessário converter taskId para Number(taskId) se já é um número
    if (confirm('Deseja realmente deletar essa tarefa?')) { // Considere usar um modal personalizado
      this.taskService.delete(taskId).subscribe({ // Chamando o método delete do TaskService
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        error: (error) => {
          alert(`Erro ao deletar tarefa: ${error.message}`); // Considere usar um modal personalizado
        }
      });
    }
  }

}
