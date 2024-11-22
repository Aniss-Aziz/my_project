import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  taskList: any[] = [];

  filterStatus: string = '';
  filteredTaskList: any[] = [];
  editTaskData: any = { id: null, title: '', description: '', status: '' };
  newTask: any = { title: '',  description: '', status: 'En cours' };
  successMessage: string = '';
  successDltMessage: string = '';
  successPutMessage: string = '';
  errorMessage: string = '';

  errorDltMessage: string = '';
  errorPutMessage: string = '';

  loggedUserObj: any;
  tokenUserObj: any;

  constructor(private taskSrv: TaskService, loginSrv: LoginService, private http:HttpClient) {
    const local = localStorage.getItem('token');
    const local_user = localStorage.getItem('user')

    if(local != null) {
      this.tokenUserObj = local;
    }

    if(local_user != null) {
      this.loggedUserObj = JSON.parse(local_user);
    }

   }
  
  
  ngOnInit(): void {
   this.getListTask();
  }

  getListTask() {
    this.taskSrv.getTasks().subscribe((res:any) => {
      this.taskList = res;
      this.filterTasks(); // Mettre à jour la liste filtrée
    }, (error) => {
      console.error('Erreur lors de la récupération des tâches', error);
    })
  }
  


  deleteTask(id: number) {

    this.taskSrv.deleteTask(id).subscribe(
      (res) => {
        console.log(`Tâche avec l'id ${id} supprimée`, res);
        
        // Supprimer localement sans rappeler `getListTask()`
        const index = this.taskList.findIndex((task) => task.id === id);
        if (index !== -1) {
          this.taskList.splice(index, 1);
        }
        this.filterTasks();
        this.successDltMessage = 'Tâche supprimée avec succès';
        this.errorDltMessage = '';
        setTimeout(() => {
          this.successDltMessage = '';
        }, 2000);
      },
      (error) => {
        this.getListTask();
       
      }
    );
  }
  // Filtrer les tâches par statut
  filterTasks() {
    if (this.filterStatus) {
      this.filteredTaskList = this.taskList.filter(task => task.status === this.filterStatus);
    } else {
      this.filteredTaskList = [...this.taskList];
    }
  }

  addTask(){

    if (!this.newTask.title || !this.newTask.description || !this.newTask.status) {
      this.errorMessage = 'Tous les champs sont requis.';
      return;
    }

    this.taskSrv.addTask(this.newTask).subscribe((res:any) => {
      this.taskList.push(res);
      this.filterTasks();
      this.successMessage = 'Tâche ajoutée avec succès';
      this.errorMessage = '';
      this.newTask = { title: '', description: '', status: '' }; 
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, (error) => {
      this.errorMessage = 'Erreur lors de l\'ajout de la tâche';
      console.error('Erreur lors de l\'ajout de la tâche', error);
    });
  }
  
  editTask(task: any) {
    this.editTaskData = { ...task };
  }

  updateTask() {
    if (!this.editTaskData.title || !this.editTaskData.description || !this.editTaskData.status) {
      this.errorPutMessage = 'Tous les champs sont requis.';
      return;
    }

    this.taskSrv.updateTask(this.editTaskData.id, this.editTaskData).subscribe(
      (res: any) => {
        this.successPutMessage = 'Tâche modifiée avec succès';
        this.errorPutMessage = '';
        this.getListTask();
        this.editTaskData = { id: null, title: '', description: '', status: '' };
        setTimeout(() => {
          this.successPutMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorPutMessage = 'Erreur lors de la mise à jour de la tâche';
        console.error('Erreur lors de la mise à jour de la tâche', error);
      }
    );
  }

  logOff() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedUserObj = undefined;
    this.tokenUserObj = undefined;
   }

   
}
