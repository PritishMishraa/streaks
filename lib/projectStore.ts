import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Project = {
    id: string
    name: string
}

type ProjectState = {
    projects: Project[]
    currentProject: Project
}

type ProjectActions = {
    addProject: (project: Project) => void
    removeProject: (id: string) => void
    updateProject: (name: string) => void
    selectProject: (id: string) => void
}

export const useProjectStore = create<ProjectState & ProjectActions>()(persist((set) => ({
    projects: [{
        id: '1',
        name: 'All Projects'
    }],
    currentProject: { id: '1', name: 'All Projects' },

    addProject: project => set(state => ({ projects: [...state.projects, project] })),
    removeProject: id => set(state => ({ projects: state.projects.filter(project => project.id !== id) })),
    updateProject: name => set(state => ({
        projects: state.projects.map(project => project.id === state.currentProject.id ?
            { ...project, name } : project)
    })),

    selectProject: id => set(state => ({ currentProject: state.projects.find(project => project.id === id) })),
}),
    { name: 'projectStore' }
))