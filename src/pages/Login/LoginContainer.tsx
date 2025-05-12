import { Center, Stack } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};


export default function LoginContainer({children}: Props) {
    return (
        <Center
            style={{
                height: '100dvh',
                width: '100%',
            }}
        >
            <Stack>
                {children}
            </Stack>
        </Center>
    )
}