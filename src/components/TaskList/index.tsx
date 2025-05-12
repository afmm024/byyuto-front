import { Button, Modal, Paper, rem, ScrollArea, Stack, Textarea, TextInput, useMantineTheme, type PaperProps } from "@mantine/core";
import { SortableContext } from '@dnd-kit/sortable';
import { useMemo } from "react";
import type { Id, ITaskForm, ITaskItem, } from "../../pages/Home/home.types";
import TaskItem from "../TaskItem";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { BsPlus } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { isNotEmpty, useForm } from "@mantine/form";

type Props = {
    createTask: (values: ITaskForm) => void;
    deleteTask: (id: Id) => void;
    logout: () => void;
    tasks: ITaskItem[];
};


export default function TaskList(props: Props) {

    const {
        createTask,
        tasks,
        deleteTask,
        logout
    } = props;
    const tablet_match = useMediaQuery('(max-width: 768px)');
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();
    const PAPER_PROPS: PaperProps = {
        radius: 'md',
        shadow: tablet_match ? 'xl' : '',
        withBorder: tablet_match,
        pb: tablet_match ? 'md' : 'xs',
        style: {
            width: tablet_match ? '100%' : '350px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: tablet_match ? theme.white : 'transparent',
        },
    };

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const form = useForm({
        initialValues: { title: '', content: '' },
        validate: {
            title: isNotEmpty('Title is required'),
            content: isNotEmpty('Content is required')
        },
    });

    return (
        <Paper {...PAPER_PROPS}>
            <Modal opened={opened} onClose={close} title="Create Task">
                <form onSubmit={form.onSubmit((values) => {
                    createTask(values)
                    close()
                })}>
                    <TextInput
                        withAsterisk
                        label="Title"
                        placeholder="Title task"
                        key={form.key('title')}
                        {...form.getInputProps('title')}
                    />
                    <Textarea
                        withAsterisk
                        label="Content"
                        placeholder="Content task"
                        key={form.key('content')}
                        {...form.getInputProps('content')}
                    />
                    <Button fullWidth c="primary" mt="xl" type="submit" loading={false}>
                        Create task
                    </Button>
                </form>
            </Modal>
            <ScrollArea
                style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: rem(500) }}
            >
                <Stack gap="sm" px="sm" py="md">
                    <SortableContext items={tasksIds}>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                            />
                        ))}
                    </SortableContext>
                </Stack>
            </ScrollArea>
            <Button
                mx="sm"
                radius="sm"
                variant="outline"
                leftSection={<BsPlus size={18} />}
                onClick={() => {
                    open()
                }}
            >
                Add task
            </Button>

            <Button
                mx="sm"
                mt={10}
                radius="sm"
                variant="default"
                c='red'
                leftSection={<TbLogout size={18} />}
                onClick={() => {
                    logout()
                }}
            >
                Logout
            </Button>
        </Paper>
    )
}