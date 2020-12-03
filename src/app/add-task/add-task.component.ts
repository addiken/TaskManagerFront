import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  constructor(private http: HttpClient) {}
  task: any = {
    heading: '',
    description: '',
    deadline: Date
  };
  // tslint:disable-next-line:typedef
  sendForm(form: NgForm){
    this.task = form.value;
    this.CreateTask();
  }
  // tslint:disable-next-line:typedef
  CreateTask() {
    const headers = {'Content-Type': 'application/json'};
    this.http.post('https://localhost:44379/Task/api/CreateTask', {
      heading: this.task.heading,
      description: this.task.description,
      deadline: this.task.deadline}, {headers}).subscribe();
  }
}
