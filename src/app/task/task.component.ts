import {ChangeDetectionStrategy, Component, Input, OnInit, Output} from '@angular/core';
import {Task} from '../entity/Task';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit{
  @Input() task: Task;
  private now: Date = new Date();
  deadline: Date;
  createDate: Date;
  done: boolean;
  inProcess: boolean;
  constructor(private http: HttpClient) {}
  close = true;
  edit = false;
  heading: string;
  description: string;
  etask: any = {
    heading: '',
    description: '',
    deadline: Date
  };
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.deadline = new Date(this.task.Deadline);
    this.createDate = new Date(this.task.CreateDate);
    this.IsDone();
    if (this.task.Heading.length > 45 ){
      this.heading = this.task.Heading.substring(0, 44) + '...';
    } else {
      this.heading = this.task.Heading;
    }
    if (this.task.Description.length > 59 ){
      this.description = this.task.Description.substring(0, 58) + '...';
    } else {
      this.description = this.task.Description;
    }
    this.etask.id = this.task.Id;
  }
  // tslint:disable-next-line:typedef
  Change(){
    this.close = !this.close;
  }
  // tslint:disable-next-line:typedef
  Edit(){
    this.edit = !this.edit;
    console.log(this.edit);
  }
  // tslint:disable-next-line:typedef
  sendForm(form: NgForm){
    this.etask = form.value;
    this.EditTask();
  }
  // tslint:disable-next-line:typedef
  EditTask() {
    const headers = {'Content-Type': 'application/json'};
    this.http.post('https://localhost:44379/Task/api/EditTask', {
      id: this.task.Id,
      heading: this.etask.heading,
      description: this.etask.description,
      deadline: this.etask.deadline,
      isDone: this.task.isDone,
    }, {headers}).subscribe();
    this.task.Heading = this.etask.heading;
    this.task.Description = this.etask.description;
    this.deadline = new Date(this.etask.deadline);
  }
  // tslint:disable-next-line:typedef
  DoTask() {
    const headers = {'Content-Type': 'application/json'};
    this.http.post('https://localhost:44379/Task/api/EditTask', {
      id: this.task.Id,
      heading: this.task.Heading,
      description: this.task.Description,
      deadline: this.task.Deadline,
      isDone: !this.task.isDone,
    }, {headers}).subscribe();
    this.done = !this.done;
    this.IsDone2();
  }
  // tslint:disable-next-line:typedef
  DoTask2() {
    const headers = {'Content-Type': 'application/json'};
    this.http.post('https://localhost:44379/Task/api/EditTask', {
      id: this.task.Id,
      heading: this.task.Heading,
      description: this.task.Description,
      deadline: this.task.Deadline,
      isDone: !this.task.isDone,
    }, {headers}).subscribe();
    this.task.isDone = !this.task.isDone;
    this.IsDone();
  }
  // tslint:disable-next-line:typedef
  DeleteTask(){
    this.http.delete('https://localhost:44379/Task/api/DeleteTask?id=' + this.task.Id)
      .subscribe();
    this.task.isDelete = !this.task.isDelete;
  }
  // tslint:disable-next-line:typedef
  IsDone(){
    if (this.task.isDone === true) {
      this.done = true;
    } else {
      this.done = false;
      if (this.deadline <= this.now) {
        this.inProcess = false;
      } else {
        this.inProcess = true;
      }
    }
  }
  // tslint:disable-next-line:typedef
  IsDone2(){
    if (this.deadline <= this.now) {
      this.inProcess = false;
    } else {
      this.inProcess = true;
    }
  }
}
