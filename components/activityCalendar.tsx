"use client";

import { useTaskStore } from "@/lib/taskStore";
import { useShallow } from 'zustand/react/shallow'
import { Tooltip } from "@nextui-org/tooltip";
import { eachDayOfInterval, endOfYear, format, getDate, getMonth, getYear, startOfYear } from 'date-fns';
import ActivityCalendar from "react-activity-calendar";
import { cloneElement, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useRouterTabs } from "@/hooks/useRouterTabs";

const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
};

export const TaskActivityCalendar = () => {
    const { tabValue, setTabValue } = useRouterTabs("tab");
    const [isLoading, setIsLoading] = useState(true); // Loading state
    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Adjust the delay as needed
    }, []);
    const { theme } = useTheme();
    const isSSR = useIsSSR();
    const tasks = useTaskStore(useShallow((state) => state.tasks));
    const changeSelectedDate = useTaskStore((state) => state.changeSelectedDate);
    const completedTasks = tasks.filter((task) => task.completed);

    const yearStart = startOfYear(new Date());
    const yearEnd = endOfYear(new Date());

    const dates = eachDayOfInterval({ start: yearStart, end: yearEnd });

    const data = dates.map(date => {
        const year = getYear(date);
        const month = getMonth(date) + 1;
        const day = getDate(date);
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const completedTasksOnDate = completedTasks.filter((task) => {
            const taskDate = new Date(task.date);
            return (
                taskDate.getFullYear() === year &&
                taskDate.getMonth() + 1 === month &&
                taskDate.getDate() === day
            );
        });
        const count = completedTasksOnDate.length;
        const level = getLevel(count);
        return { date: formattedDate, count, level };
    });

    return (
        <ActivityCalendar
            data={data}
            loading={isLoading}
            blockSize={16}
            blockRadius={6}
            blockMargin={4}
            fontSize={16}
            theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#2b2b2b', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            colorScheme={isSSR ? 'dark' : theme === 'dark' ? 'dark' : 'light'}
            renderBlock={(block, activity) => (
                <Tooltip content={`${activity.count} tasks on ${format(new Date(activity.date), 'd MMM yyyy')}`}>
                    {cloneElement(block, {
                        className: 'cursor-pointer',
                    })}
                </Tooltip>
            )}
            eventHandlers={{
                onClick: (_event) => (activity) => {
                    changeSelectedDate(activity.date);
                    if (tabValue !== 'Completed') {
                        setTabValue('Completed');
                    }
                }
            }}
        />
    );
};