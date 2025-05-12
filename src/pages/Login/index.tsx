import { useMutation } from "@tanstack/react-query";
import AuthRepository from "../../repositories/auth.repository";
import Login from "./Login";
import type { LoginForm } from "./login.types";
import LoginContainer from "./LoginContainer";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const authRepository = new AuthRepository()
     let navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data: LoginForm) => await authRepository.authUser(data),
        onSuccess: (response) => {
            notifications.show({
                title: 'Success authentication',
                message: 'Welcome! 🌟',
                color: 'green'
            });
            localStorage.setItem('token_access', response.accessToken)
            navigate("/")

        },
        onError: () => {
            notifications.show({
                title: 'Error authentication',
                message: 'Please try again!',
                color: 'red'
            })
        }
    })

    const handleSubmit = async (values: LoginForm) => {
        try {
            mutation.mutate(values);
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    return (
        <LoginContainer>
            <Login onSubmit={handleSubmit} />
        </LoginContainer>
    )

}