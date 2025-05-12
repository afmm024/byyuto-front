import type { ITaskForm } from "../pages/Home/home.types";
import axiosCustom from "../services/axios";


export default class TaskRepository {

    async getAllTask(): Promise<any> {
        const response = await axiosCustom.get(`/tasks`);
        if(response.status !== 200) {
            throw new Error(`${response.status} ${response.data.message}`);
        }
        return response.data;
    }

    async createTask(data: ITaskForm): Promise<any> {
        const response = await axiosCustom.post(`/tasks/create`, data);
        if(response.status !== 200 && response.status !== 201) {
            throw new Error(`${response.status} ${response.data.message}`);
        }
        return response.data;
    }

    async deleteTask(id: number): Promise<any> {
        const response = await axiosCustom.post(`/tasks/${id}/delete`);
        if(response.status !== 200 && response.status !== 201) {
            throw new Error(`${response.status} ${response.data.message}`);
        }
        return response.data;
    }


}