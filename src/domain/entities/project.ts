import { ITask } from '../interfaces/task.interface';
import { IUser } from '../interfaces/user.interface';
import { IProject } from './../interfaces/project.interface';
export class Project implements IProject{
    id:number;
    name:string;
    description: string;
    tasks: ITask[];
    user: IUser;
}