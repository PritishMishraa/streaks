import { create } from 'zustand'

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
}

type TaskActions = {
    addTask: (task: Task) => void
    removeTask: (id: string) => void
    toggleTask: (id: string) => void

    changeSelectedDate: (date: string) => void
}

export const useTaskStore = create<TaskState & TaskActions>()(set => ({
    tasks: [],
    addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
    removeTask: id => set(state => ({ tasks: state.tasks.filter(task => task.id !== id) })),
    toggleTask: id => set(state => ({ tasks: state.tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task) })),

    selectedDate: new Date().toISOString(),
    changeSelectedDate: date => set({ selectedDate: date })
}))