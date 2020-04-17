import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  searchText: '';
  tasks: Task[] = [];
  resultTasks: Task[] = [];
  newTask: Task = { label: '', completed: false};
  editButton = false;
  showForm = false;

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(){
    this.service.findAll().subscribe(tasks => {this.resultTasks = this.tasks = tasks; });
  }
  deleteTask(id){
    this.service.delete(id).subscribe( () => { this.tasks = this.tasks.filter(task => task.id !== id );});
  }

  persistTask(){
    this.service.persist(this.newTask).subscribe((task) => {
      // @ts-ignore
      this.resultTasks = this.tasks = [task, ... this.tasks];
      this.resetTask();
      this.showForm = false;
    });
  }

  resetTask(){
    this.newTask = {
      label: '',
      completed: false
    };
  }

  changeCompleted(task){
    this.service.completed(task.id, task.completed).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  editTAsk(task){
    this.newTask = task;
    this.editButton = true;
  }

  updateTask(){
    this.service.update(this.newTask).subscribe(task => {this.resetTask(); this.editButton = false; });
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
