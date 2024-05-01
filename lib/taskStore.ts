import { create } from 'zustand'
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
}

type TaskActions = {
    addTask: (task: Task) => void
    updateTask: (id: string, name: string) => void
    removeTask: (id: string) => void
    toggleTask: (id: string) => void

    changeSelectedDate: (date: string) => void
}

export const useTaskStore = create<TaskState & TaskActions>()(persist(set => ({
    tasks: [],
    addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
    updateTask: (id, name) => set(state => ({ tasks: state.tasks.map(task => task.id === id ? { ...task, name } : task) })),
    removeTask: id => set(state => ({ tasks: state.tasks.filter(task => task.id !== id) })),
    toggleTask: id => set(state => ({ tasks: state.tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task) })),

    selectedDate: new Date().toISOString(),
    changeSelectedDate: date => set({ selectedDate: date })
}),
    { name: 'taskStore' }
))