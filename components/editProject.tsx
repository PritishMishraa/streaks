"use client";

import { useProjectStore } from "@/lib/projectStore";
import { useTaskStore } from "@/lib/taskStore";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useState } from "react";

export const EditProject = ({ isOpen, onOpenChange }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const currentProject = useProjectStore((state) => state.currentProject);
    const updateProject = useProjectStore((state) => state.updateProject);
    const removeProject = useProjectStore((state) => state.removeProject);
    const selectProject = useProjectStore((state) => state.selectProject);

    const tasks = useTaskStore((state) => state.tasks);
    const removeTask = useTaskStore((state) => state.removeTask);

    const [newProjectName, setNewProjectName] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProjectName(e.target.value);
    };

    const handleSubmit = () => {
        if (!newProjectName) return;

        updateProject(newProjectName);
        selectProject(currentProject.id);
        setNewProjectName("");
        onOpenChange(false);
    };

    const handleDelete = () => {
        removeProject(currentProject.id);
        tasks.forEach(task => {
            if (task.projectId === currentProject.id) {
                removeTask(task.id);
            }
        });
        selectProject("1");
        setNewProjectName("");
        onOpenChange(false);
    };

    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 capitalize">Edit Project: {currentProject.name}</ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="New Project Name"
                        type="text"
                        variant="faded"
                        value={newProjectName}
                        onChange={handleInputChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => handleDelete()}>
                        Delete
                    </Button>
                    <Button color="success" type="submit" onClick={() => handleSubmit()}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}