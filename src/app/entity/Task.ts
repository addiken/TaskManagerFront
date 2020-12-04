export class Task{
  Id: number;
  Heading: string;
  Description: string;
  CreateDate: Date;
  Deadline: Date;
  isDone: boolean;
  isDelete: boolean;

  constructor(Id: number, Heading: string, Description: string, CreateDate: Date, Deadline: Date, isDone: boolean) {
    this.Id = Id;
    this.Heading = Heading;
    this.Description = Description;
    this.CreateDate = CreateDate;
    this.Deadline = Deadline;
    this.isDone = isDone;
    this.isDelete = true;
  }
}
