"use client";

import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";
import { AddIcon, DropdownIcon, SettingsIcon } from "./icons";
import { NewProject } from "./newProject";
import { useProjectStore } from "@/lib/projectStore";
import { EditProject } from "./editProject";

export const Project = () => {
    const projects = useProjectStore((state) => state.projects);
    const currentProject = useProjectStore((state) => state.currentProject);
    const selectProject = useProjectStore((state) => state.selectProject);

    const newProjectModal = useDisclosure();
    const editProjectModal = useDisclosure();

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button className="capitalize" variant="bordered">
                        {currentProject.name} <DropdownIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Project selection"
                    selectionMode="single"
                    selectedKeys={[currentProject.id]}
                    onSelectionChange={(keys) => {
                        // @ts-ignore
                        const project = projects.find((project) => project.id === (keys.currentKey));
                        if (project) {
                            selectProject(project.id);
                        }
                    }}
                >
                    {projects.map((project) => (
                        <DropdownItem className="capitalize" key={project.id}>
                            {project.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <Button
                className="text-small"
                isIconOnly
                variant="solid"
                aria-label="Add"
                onPress={() => newProjectModal.onOpen()}
            >
                <AddIcon />
            </Button>
            {currentProject.id !== '1' &&
                <Button
                    className="text-small"
                    isIconOnly
                    variant="solid"
                    aria-label="Add"
                    onPress={() => editProjectModal.onOpen()}
                >
                    <SettingsIcon />
                </Button>
            }
            <NewProject isOpen={newProjectModal.isOpen} onOpenChange={newProjectModal.onOpenChange} />
            <EditProject isOpen={editProjectModal.isOpen} onOpenChange={editProjectModal.onOpenChange} />
        </>
    );
};