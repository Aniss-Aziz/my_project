import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../global/environment'
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = global.apiUrl;
  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/tasks`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.api}/tasks`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/tasks/${id}`);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.api}/tasks/${id}`, task);
  }

  filterTasks(status: string): Observable<any> {
    return this.http.get<any>(`${this.api}/tasks?status=${status}`);
  }

}
