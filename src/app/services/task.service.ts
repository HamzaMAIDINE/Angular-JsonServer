import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/tasks';
  findAll(){
    return this.http.get<Task[]>(this.url);
  }

  delete(id){
    return this.http.delete(this.url + '/' + id);
  }

  persist(task){
    return this.http.post<Task[]>(this.url, task);
  }

  completed(id, completed ){
    return this.http.patch(this.url + '/' + id, {completed: !completed});
  }

  update(task){
    return this.http.put( this.url + '/' + task.id, task);
  }
}
