import { DateKeyString } from '../../utilities/getDateKeyString.function';

export enum TaskUnit { Timestamp, Count }

export interface TaskEntry {
  progress: number;
  unit: TaskUnit;
}

export interface TasksStoreType {
  tasks: TasksListType;
  days: DaysListType;
}

export interface Task {
  id: number;
  name: string;
  unit: TaskUnit;
  count: number;
  timestamp: number;
}

export interface Day {
  tasks: { [key: number]: TaskEntry };
}

export interface TasksListType { [key: number]: Task }

export interface DaysListType { [key: DateKeyString]: Day }
