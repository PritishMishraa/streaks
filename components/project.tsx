"use client";

import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { AddIcon, DropdownIcon } from "./icons";
import { NewProject } from "./newProject";

type ProjectItem = {
    title: string;
    id: number;
};

const projects: ProjectItem[] = [
    {
        title: "All Projects",
        id: 1,
    },
    {
        title: "Work",
        id: 2,
    },
    {
        title: "GYM",
        id: 3,
    },
];

export const Project = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">
                        {selectedProject.title} <DropdownIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Project selection"
                    selectionMode="single"
                    selectedKeys={[selectedProject.id]}
                    onSelectionChange={(keys) => {
                        // @ts-ignore
                        const project = projects.find((project) => project.id === Number(keys.currentKey));
                        if (project) {
                            setSelectedProject(project);
                        }
                    }}
                >
                    {projects.map((project) => (
                        <DropdownItem key={project.id}>
                            {project.title}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <Button
                className="text-small"
                isIconOnly
                variant="solid"
                aria-label="Add"
                onPress={() => onOpen()}
            >
                <AddIcon />
            </Button>
            <NewProject isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
};