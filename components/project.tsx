"use client";

import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { AddIcon, DropdownIcon } from "./icons";
import { NewProject } from "./newProject";
import { useProjectStore } from "@/lib/projectStore";

export const Project = () => {
    const projects = useProjectStore((state) => state.projects);
    const currentProject = useProjectStore((state) => state.currentProject);
    const selectProject = useProjectStore((state) => state.selectProject);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                        console.log(keys)
                        console.log(projects)
                        // @ts-ignore
                        const project = projects.find((project) => project.id === (keys.currentKey));
                        console.log(project);
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
                onPress={() => onOpen()}
            >
                <AddIcon />
            </Button>
            <NewProject isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
};