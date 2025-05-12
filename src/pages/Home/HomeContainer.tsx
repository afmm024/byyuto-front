import { Center, Container, Stack } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};


export default function HomeContainer({ children }: Props) {
    return (
        <Container fluid>
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
        </Container>
    )
}