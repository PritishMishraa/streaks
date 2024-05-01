"use client";

import TaskStats from "./taskStats";
import TasksHistory from "./tasksHistory";

import { Tabs, Tab } from "@nextui-org/tabs";

export default function StatsAndHistory() {
    return (
        <div className="flex flex-col w-1/2 gap-2">
            <Tabs variant="solid" size="lg" aria-label="Stats and History" classNames={{
                panel: "p-0 h-full overflow-y-scroll"
            }}>
                <Tab key="Stats" title="Stats" aria-label="Stats">
                    <TaskStats />
                </Tab>
                <Tab key="Completed" title="Completed" aria-label="Completed">
                    <TasksHistory />
                </Tab>
            </Tabs>
        </div>
    )
}