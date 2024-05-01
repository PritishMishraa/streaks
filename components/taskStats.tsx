"use client";

import { useTaskStore } from "@/lib/taskStore";
import { Card, CardHeader } from "@nextui-org/card";

export default function TaskStats() {
    const tasks = useTaskStore((state) => state.tasks);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <div className="flex w-full h-full gap-4">
            <Card className="w-full h-full" radius="md">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="font-bold tracking-widest uppercase text-large text-foreground/60">streak</p>
                    <h4 className="font-bold text-9xl text-foreground">0</h4>
                </CardHeader>
            </Card>
            <Card className="w-full h-full" radius="md">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="font-bold tracking-widest uppercase text-large text-foreground/60">Completed task</p>
                    <h4 className="font-bold text-9xl text-foreground">{completedTasks.length}</h4>
                </CardHeader>
            </Card>
        </div>
    )
}