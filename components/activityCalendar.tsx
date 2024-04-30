"use client";

import { Tooltip } from "@nextui-org/tooltip";
import { eachDayOfInterval, endOfYear, format, getDate, getMonth, getYear, startOfYear } from 'date-fns';
import ActivityCalendar from "react-activity-calendar";

export const TaskActivityCalendar = () => {
    const yearStart = startOfYear(new Date());
    const yearEnd = endOfYear(new Date());

    const dates = eachDayOfInterval({ start: yearStart, end: yearEnd });

    const data = dates.map(date => {
        const year = getYear(date);
        const month = getMonth(date) + 1;
        const day = getDate(date);
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const count = Math.floor(Math.random() * 100);
        const level = Math.floor(Math.random() * 4) + 1;

        return { date: formattedDate, count, level };
    });

    return (
        <ActivityCalendar
            data={data}
            blockSize={16}
            blockRadius={6}
            blockMargin={4}
            fontSize={16}
            theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            renderBlock={(block, activity) => (
                <Tooltip content={`${activity.count} tasks on ${format(new Date(activity.date), 'd MMM yyyy')}`}>
                    {block}
                </Tooltip>
            )}
            eventHandlers={{
                onClick: (_event) => (activity) => {
                    alert(JSON.stringify(activity));
                }
            }}
        />
    );
};