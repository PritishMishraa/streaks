import { useShallow } from 'zustand/react/shallow'

import { useTaskStore } from "@/lib/taskStore";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { format } from "date-fns";
import { Checkbox } from '@nextui-org/checkbox';
import { useProjectStore } from '@/lib/projectStore';

export default function TasksHistory() {
    const tasks = useTaskStore(useShallow((state) => state.tasks));
    const selectedDate = useTaskStore((state) => state.selectedDate);
    const changeSelectedDate = useTaskStore((state) => state.changeSelectedDate);
    const completedTasks = tasks.filter((task) => task.completed && new Date(task.date).toDateString() === new Date(selectedDate).toDateString());
    const getProject = useProjectStore((state) => state.getProject);

    return (
        <div className="flex flex-col w-full h-full">
            <ul className="flex flex-col h-full gap-2 p-4 overflow-y-scroll bg-content2 rounded-medium">
                <div className='flex flex-row justify-between'>
                    {
                        new Date(selectedDate).getDate() !== new Date().getDate() &&
                        <span
                            onClick={() => changeSelectedDate(new Date().toISOString())}
                            className="text-foreground/60 text-left text-small cursor-pointer hover:text-foreground/80">
                            Jump to Today
                        </span>
                    }
                    <span className="text-foreground/60 text-right text-small grow">
                        {completedTasks.length} tasks • {format(new Date(selectedDate), 'd MMM yyyy')}
                    </span>
                </div>
                {completedTasks.map((task, index) => (
                    <li key={index}>
                        <Card>
                            <CardBody className="flex flex-row justify-between w-full">
                                <Checkbox
                                    isSelected={true}
                                    color="success"
                                    size="md"
                                    disabled={true}
                                    className='w-full'
                                >
                                    {task.name}{' '}
                                    <span className='text-default-500 capitalize text-small'>
                                        #{getProject(task.projectId).name}
                                    </span>
                                </Checkbox>
                            </CardBody>
                        </Card>
                    </li>
                ))}
            </ul>
        </div >
    )
}