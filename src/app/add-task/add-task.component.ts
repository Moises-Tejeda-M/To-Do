import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { TaskModel } from '../task.model.model';
import { RoundPipe } from '../round.pipe';
import { CommonModule } from '@angular/common';
import { DateHourPipe } from '../date-hour.pipe';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, DateHourPipe, RoundPipe, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  newTask: string = '';
  tasks: TaskModel[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';
  currentUser: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    console.log('Usuario actual:', this.currentUser);

    if (this.currentUser) {
      const stored = localStorage.getItem(`tasks-${this.currentUser}`);
      if (stored) {
         this.tasks = JSON.parse(stored).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          editing: false
      }));
    }
  }
}

  saveToStorage() {
    if (this.currentUser) {
    localStorage.setItem(`tasks-${this.currentUser}`, JSON.stringify(this.tasks));
    }
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ 
        id: Date.now(),
        text: this.newTask, 
        filled: false,
        createdAt: new Date(),
        editing: false
       });
      this.newTask = '';
      this.saveToStorage();
    }
  }

  eliminateTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveToStorage();
  }

  toggleFilled(index: number) {
    this.tasks[index].filled = !this.tasks[index].filled;
    this.saveToStorage();
  }

  editTask(index: number) {
    this.tasks[index].editing = true;
  }

  saveEdit(index: number) {
    this.tasks[index].editing = false;
    this.saveToStorage();
  }

  setFilter(type: 'all' | 'completed' | 'pending') {
    this.filter = type;
  }

  eliminateCompletedTasks(): void {
    this.tasks = this.tasks.filter(task => !task.filled);
    this.saveToStorage();
  }

  get filteredTasks() {
    if (this.filter === 'all') return this.tasks;
    if (this.filter === 'completed') return this.tasks.filter(t => t.filled);
    return this.tasks.filter(t => !t.filled);
  }
  get totalCount(): number {
    return this.tasks.length;
  }

  get completedCount(): number {
    return this.tasks.filter(t => t.filled).length;
  }

  get pendingCount() {
    return this.tasks.filter(t => !t.filled).length;
  }

  get progressPercentage(): number {
    return this.totalCount === 0 ? 0 : (this.completedCount / this.totalCount) * 100;
  }

  get hasCompletedTasks(): boolean {
    return this.tasks.some(task => task.filled);
  }

  trackByid(index: number, task: TaskModel): number {
    return task.id;
  }
}