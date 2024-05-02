"use client";

import { useEffect } from "react";
import { Card, CardHeader } from "@nextui-org/card";

import { useTaskStore } from "@/lib/taskStore";

export default function TaskStats() {
    useEffect(() => {
        useTaskStore.getState().resetStreak();
    }, []);

    const tasks = useTaskStore((state) => state.tasks);
    const completedTasks = tasks.filter((task) => task.completed);
    const currentStreak = useTaskStore((state) => state.currentStreak);

    return (
        <div className="flex w-full h-full gap-4">
            <Card className="w-full h-full" radius="md">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="font-bold tracking-widest uppercase text-large text-foreground/60">streak</p>
                    <h4 className="font-bold text-9xl text-foreground">{currentStreak}</h4>
                </CardHeader>
            </Card>
            <Card className="w-full h-full" radius="md">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="font-bold tracking-widest uppercase text-large text-foreground/60">Completed tasks</p>
                    <h4 className="font-bold text-9xl text-foreground">{completedTasks.length}</h4>
                </CardHeader>
            </Card>
        </div>
    )
}