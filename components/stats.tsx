"use client";

import { Card, CardHeader } from "@nextui-org/card";

export default function Stats() {
    return (
        <div className="flex w-full h-full gap-4">
            <Card className="w-full h-full" radius="md">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="font-bold tracking-widest uppercase text-large text-foreground/60">streak</p>
                    <h4 className="font-bold text-9xl text-foreground">2</h4>
                </CardHeader>
            </Card>
            <Card className="w-full h-full" radius="md">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="font-bold tracking-widest uppercase text-large text-foreground/60">Completed task</p>
                    <h4 className="font-bold text-9xl text-foreground">176</h4>
                </CardHeader>
            </Card>
        </div>
    )
}