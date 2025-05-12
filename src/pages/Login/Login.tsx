import {
    Alert,
    Button,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Surface from '../../components/Surface';
import classes from './login.module.css';
import type { LoginForm } from './login.types';

type Login = {
    onSubmit: (values: LoginForm) => void;
}


export default function Login({onSubmit}: Login) {

    const form = useForm({
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value && value?.length < 6
                    ? 'Password must include at least 6 characters'
                    : null,
        },
    });


    return (
        <>
            <Title ta="center">Welcome back!</Title>
            <Text ta="center">Sign in to your account to continue</Text>

            <Surface component={Paper} className={classes.card}>
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        required
                        classNames={{ label: classes.label }}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        mt="md"
                        classNames={{ label: classes.label }}
                        {...form.getInputProps('password')}
                    />
                    <Button fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>
                </form>
            </Surface>
        </>
    )
}