import { create } from 'zustand'
import { isToday, subDays } from 'date-fns'
import { persist } from 'zustand/middleware'

type Task = {
    id: string
    name: string
    date: string
    completed: boolean
    projectId: string
}

type TaskState = {
    tasks: Task[]

    selectedDate: string

    currentStreak: number
}

type TaskActions = {
    addTask: (task: Task) => void
    updateTask: (id: string, name: string) => void
    removeTask: (id: string) => void
    toggleTask: (id: string) => void

    changeSelectedDate: (date: string) => void

    resetStreak: () => void
}

export const useTaskStore = create<TaskState & TaskActions>()(persist(set => ({
    tasks: [],
    addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
    updateTask: (id, name) => set(state => ({ tasks: state.tasks.map(task => task.id === id ? { ...task, name } : task) })),
    removeTask: id => set(state => ({ tasks: state.tasks.filter(task => task.id !== id) })),
    toggleTask: id => set(state => {
        const newState = { tasks: state.tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task) };
        const completedToday = newState.tasks.filter(task => task.completed && isToday(task.date)).length;
        if (completedToday == 1) {
            const streak = state.currentStreak + 1;
            set({ currentStreak: streak });
        }

        return newState;
    }),

    selectedDate: new Date().toISOString(),
    changeSelectedDate: date => set({ selectedDate: date }),

    currentStreak: 0,
    resetStreak: () => set(state => {
        const yesterday = subDays(new Date(), 1);
        const completedToday = state.tasks.filter(task => task.completed && isToday(task.date)).length;
        const completedYesterday = state.tasks.filter(task => task.completed && (new Date(task.date).getDate() === yesterday.getDate())).length;

        if (completedYesterday === 0 && completedToday === 0) {
            return { currentStreak: 0 };
        }

        return state;
    }),
}),
    { name: 'taskStore' }
))