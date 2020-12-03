import {Component, OnInit} from '@angular/core';
import {Task} from './entity/Task';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any;
  task: Task;
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.GetAllTasks();
  }

  constructor(private http: HttpClient) {}
  // tslint:disable-next-line:typedef
  GetAllTasks() {
    this.http.get('https://localhost:44379/Task/api/GetAllTask')
      .subscribe((tasks: any) => {
        this.tasks = tasks.map(task => new Task(
          task.id,
          task.heading,
          task.description,
          task.createDate,
          task.deadline,
          task.isDone));
      });
  }
  // tslint:disable-next-line:typedef
  GetTaskById() {
    this.http.get('https://localhost:44379/Task/api/GetTaskById?id=' + document.getElementsByTagName('input')[0].value)
      .subscribe((t: any) => {
        this.task = new Task(t.id, t.heading, t.description, t.createDate, t.deadLine, t.isDone);
      });
  }
}
