"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Card, CardBody } from "@nextui-org/card";

import { useTaskStore } from "@/lib/taskStore";
import { DeleteIcon, EditIcon, TickIcon } from "./icons";

export default function Tasks() {
    const tasks = useTaskStore((state) => state.tasks);
    const toggleTask = useTaskStore((state) => state.toggleTask);
    const removeTask = useTaskStore((state) => state.removeTask);
    const filteredTasks = tasks.filter((task) => !task.completed);

    const [isEditingTaskId, setIsEditingTaskId] = useState<string | null>(null);

    function handleCheckboxChange(id: string) {
        toggleTask(id);
    }

    function handelEditing(id: string, value: boolean) {
        setIsEditingTaskId(value ? id : null);
    }

    function handelKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            setIsEditingTaskId(null);
        }
    }

    return (
        <ul className="flex flex-col w-full h-full gap-2 p-4 overflow-y-auto bg-content2 rounded-medium">
            {filteredTasks.map((task) => (
                <motion.li
                    key={task.id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <Card>
                        <CardBody className="flex-row items-center w-full">
                            {isEditingTaskId === task.id ?
                                <div className="grow">
                                    <Input
                                        className="w-full pr-2"
                                        value={task.name}
                                        onValueChange={(value) => {
                                            useTaskStore.getState().updateTask(task.id, value);
                                        }}
                                        onKeyDown={handelKeyDown}
                                    />
                                </div>
                                :
                                <div
                                    className="cursor-pointer grow"
                                    onClick={() => handleCheckboxChange(task.id)}
                                >

                                    <Checkbox
                                        isSelected={task.completed}
                                        onValueChange={() => handleCheckboxChange(task.id)}
                                        color="success"
                                        size="md"
                                    >
                                        {task.name}
                                    </Checkbox>
                                </div>
                            }
                            <div className="flex gap-2 pr-2">
                                {isEditingTaskId === task.id
                                    ? <TickIcon className="cursor-pointer" onClick={() => handelEditing(task.id, false)} />
                                    : <EditIcon className="cursor-pointer" onClick={() => handelEditing(task.id, true)} />
                                }
                                <DeleteIcon className="cursor-pointer" onClick={() => removeTask(task.id)} />
                            </div>
                        </CardBody>
                    </Card>
                </motion.li>
            ))}
        </ul>
    )
}
