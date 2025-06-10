import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task/task.model';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-edit.html',
  styleUrls: ['./task-edit.scss']
})
export class TaskEdit implements OnInit {
  task: Task | null = null;
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private taskService: TaskService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const taskId = parseInt(idParam, 10);
        if (isNaN(taskId)) {
          this.errorMessage = 'ID da tarefa inválido.';
          this.isLoading = false;
          this.router.navigate(['/tasks']);
          return;
        }
        this.loadTask(taskId);
      } else {
        this.errorMessage = 'Nenhum ID de tarefa fornecido para edição.';
        this.isLoading = false;
        this.router.navigate(['/tasks']);
      }
    });
  }

  loadTask(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.taskService.findOne(id).subscribe({
      next: (task: Task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(`Erro ao carregar tarefa com ID ${id}:`, error);
        this.errorMessage = error.message || 'Erro ao carregar tarefa. Verifique o ID e tente novamente.';
        this.isLoading = false;
      }
    });
  }

  onUpdate(): void {
    if (!this.task || !this.task.title.trim()) {
      this.errorMessage = 'O título da tarefa é obrigatório.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    // CRUCIAL: Crie um novo objeto de payload que exclui a propriedade 'id'
    // O 'id' já está sendo enviado como parâmetro de URL para o backend.
    const { id, ...updatePayload } = this.task;

    // Chama o serviço para atualizar a tarefa, passando o 'id' e o 'updatePayload'
    this.taskService.update(id, updatePayload).subscribe({
      next: (updatedTask: Task) => {
        console.log('Tarefa atualizada com sucesso:', updatedTask);
        this.isSubmitting = false;
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Erro ao atualizar tarefa:', error);
        this.errorMessage = error.message || 'Erro ao atualizar tarefa. Tente novamente.';
        this.isSubmitting = false;
      }
    });
  }
}
