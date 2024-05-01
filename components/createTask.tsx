"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import Tasks from "./tasks";
import { useTaskStore } from "@/lib/taskStore";
import { useProjectStore } from "@/lib/projectStore";

export default function CreateTask() {
    const addTask = useTaskStore((state) => state.addTask);
    const currentProject = useProjectStore((state) => state.currentProject);

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
        setValue("");
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
            <Tasks />
        </div>
    );
}