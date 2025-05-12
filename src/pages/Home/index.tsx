import TaskRepository from "../../repositories/task.repository";
import Home from "./Home";
import HomeContainer from "./HomeContainer";
import { useQuery } from '@tanstack/react-query'


export default function HomePage() {

    const taskRepository = new TaskRepository()
    const { isLoading, isError , data, error, refetch } = useQuery({ queryKey: ['allTasks'], queryFn: taskRepository.getAllTask })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const handleRefresh = () => {
        refetch();
    }

    return (
        <HomeContainer>
            <Home tasks={data} onRefresh={handleRefresh} />
        </HomeContainer>
    )
}