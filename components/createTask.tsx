"use client";

import { useTaskStore } from "@/lib/taskStore";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "./icons";
import { useProjectStore } from "@/lib/projectStore";

export default function CreateTask() {
    const tasks = useTaskStore((state) => state.tasks);
    const addTask = useTaskStore((state) => state.addTask);
    const toggleTask = useTaskStore((state) => state.toggleTask);
    const removeTask = useTaskStore((state) => state.removeTask);
    const currentProject = useProjectStore((state) => state.currentProject);

    const filteredTasks = tasks.filter((task) => !task.completed);

    const [value, setValue] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!value) return;
        const newTask = {
            id: nanoid(),
            name: value,
            date: new Date().toISOString(),
            completed: false,
            projectId: currentProject.id
        };
        addTask(newTask);
        console.log("What are you working on today?:", newTask);
        setValue("");
    }

    function handleCheckboxChange(id: string) {
        toggleTask(id);
    }

    return (
        <div className="flex flex-col w-1/2 gap-2">
            <form onSubmit={handleSubmit} className="flex items-end w-full gap-2">
                <Input
                    label="What are you working on today?"
                    labelPlacement="outside"
                    placeholder="Today, I am working on..."
                    size="lg"
                    value={value}
                    onValueChange={setValue}
                />
                <Button
                    variant="solid"
                    color="warning"
                    size="lg"
                    type="submit"
                    className="font-semibold tracking-wide text-foreground text-medium">
                    Create
                </Button>
            </form>
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
                                <div className="flex gap-2 pr-2">
                                    <EditIcon />
                                    <DeleteIcon className="cursor-pointer" onClick={() => removeTask(task.id)} />
                                </div>
                            </CardBody>
                        </Card>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}