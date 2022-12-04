import http from "../utils/http-common";
import {ITaskData} from "../types/types";

class TaskDataService {
  getAll() {
    return http.get<Array<ITaskData>>("/tasks");
  }

  get(id: string | number) {
    return http.get<ITaskData>(`/tasks/${id}`);
  }

  create(data: ITaskData) {
    return http.post<ITaskData>("/tasks", data);
  }

  update(data: ITaskData, id: any) {
    return http.put<any>(`/tasks/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete<any>("/tasks");
  }

  findByName(name: string) {
    return http.get<Array<ITaskData>>(`/tasks?name=${name}`);
  }
}

export default new TaskDataService();