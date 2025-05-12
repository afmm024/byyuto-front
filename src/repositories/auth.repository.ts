import type { LoginForm } from "../pages/Login/login.types";
import axiosCustom from "../services/axios";


export default class AuthRepository {

    async authUser(data: LoginForm): Promise<any> {
        const response = await axiosCustom.post(`/auth/login`, data);
        if(response.status !== 200 && response.status !== 201) {
            throw new Error(`${response.status} ${response.data.message}`);
        }
        return response.data;
    }

    async authLogout(): Promise<any> {
        const response = await axiosCustom.post(`/auth/logout`);
        if(response.status !== 200 && response.status !== 201) {
            throw new Error(`${response.status} ${response.data.message}`);
        }
        return response.data;
    }

    


}