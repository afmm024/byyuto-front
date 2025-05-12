import { ScrollArea } from "@mantine/core";
import type { Id, ITaskForm, ITaskItem } from "./home.types";
import { DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import TaskList from "../../components/TaskList";
import { useMutation } from "@tanstack/react-query";
import TaskRepository from "../../repositories/task.repository";
import { notifications } from "@mantine/notifications";
import AuthRepository from "../../repositories/auth.repository";
import { useNavigate } from "react-router-dom";

type Props = {
    onRefresh: () => void,
    tasks: ITaskItem[]
}


export default function Home({tasks, onRefresh}: Props) {

    let navigate = useNavigate();

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => await new TaskRepository().deleteTask(id),
        onSuccess: () => {
            notifications.show({
                title: 'Task delete',
                message: 'Task has been deleted!',
                color: 'green'
            });
            onRefresh();

        },
        onError: () => {
            notifications.show({
                title: 'Task delete',
                message: 'Error in task delete process!',
                color: 'red'
            })
        }
    })

     const createMutation = useMutation({
        mutationFn: async (data: ITaskForm) => await new TaskRepository().createTask(data),
        onSuccess: () => {
            notifications.show({
                title: 'Task create',
                message: 'Task has been created!',
                color: 'green'
            });
            onRefresh();

        },
        onError: () => {
            notifications.show({
                title: 'Task create',
                message: 'Error in task create process!',
                color: 'red'
            })
        }
    })

    const logoutMutation = useMutation({
        mutationFn: async () => await new AuthRepository().authLogout(),
        onSuccess: () => {
            notifications.show({
                title: 'Logout',
                message: 'Good bye!',
                color: 'green'
            });
            localStorage.clear();
            navigate("/login")


        },
        onError: () => {
            notifications.show({
                title: 'Logout',
                message: 'Error in logout process!',
                color: 'red'
            })
        }
    })


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    function createTask(payload: ITaskForm) {
        createMutation.mutate(payload)
    }

    function deleteTask(id: Id) {
        deleteMutation.mutate(id)
    }

    function logout() {
        logoutMutation.mutate()
    }

    return (
        <ScrollArea
            h="100%"
            w="100%"
            style={{
                margin: 'auto',
                display: 'flex',
                minHeight: '70vh',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                overflowX: 'auto',
                overflowY: 'hidden',
            }}
        >
            <DndContext
                sensors={sensors}
            >
                <TaskList createTask={createTask} deleteTask={deleteTask} logout={logout} tasks={tasks} />
            </DndContext>
        </ScrollArea>
    )
}