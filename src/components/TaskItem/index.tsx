import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ActionIcon, Box, Card, Divider, Flex, Menu, Text, Tooltip } from "@mantine/core";
import type { Id, ITaskItem } from "../../pages/Home/home.types";
import { modals } from '@mantine/modals';
import classes from './taskitem.module.css';
import { BsThreeDots, BsTrash } from "react-icons/bs";


type Props = {
    task: ITaskItem;
    deleteTask: (id: Id) => void;
};

export default function TaskItem(props: Props) {

    const { task, deleteTask } = props;
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const confirmModal = (task: ITaskItem) =>
        modals.openConfirmModal({
            title: `Delete Task?`,
            centered: true,
            children: <Text size="sm">This task will be deleted</Text>,
            labels: { confirm: 'Delete', cancel: "No don't delete it" },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => {
                deleteTask(task.id);
            },
        });

    if (isDragging) {
        return (
            <Box ref={setNodeRef} style={style} p="sm" className={classes.dragBox} />
        );
    }

    return (
        <Card
            ref={setNodeRef}
            className={classes.card}
            shadow="md"
            radius="md"
            style={{
                ...style,
                cursor: 'grab',
            }}
            {...attributes}
            {...listeners}
        >
            <Card.Section p="sm">
                <Flex>
                    <Text
                        my="auto"
                        size="sm"
                        style={{
                            height: '90%',
                            width: '100%',
                            overflowY: 'hidden',
                            overflowX: 'hidden',
                        }}
                    >
                        {task.title}
                    </Text>
                    <Menu shadow="md" position="left-start" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="subtle">
                                <BsThreeDots size={18} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Tooltip label="Delete task">
                                <Menu.Item
                                    leftSection={<BsTrash size={18} />}
                                    onClick={() => {
                                        confirmModal(task);
                                    }}
                                >
                                    Delete
                                </Menu.Item>
                            </Tooltip>
                        </Menu.Dropdown>
                    </Menu>
                </Flex>
            </Card.Section>
            <Card.Section>
                <Divider />
            </Card.Section>
            <Card.Section p="sm">
                <Text>
                    {task.content}
                </Text>
            </Card.Section>
        </Card>
    )
}