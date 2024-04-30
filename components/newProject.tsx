"use client";

import { useProjectStore } from "@/lib/projectStore";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { nanoid } from "nanoid";
import { useState } from "react";

export const NewProject = ({ isOpen, onOpenChange }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const addProject = useProjectStore((state) => state.addProject);
    const selectProject = useProjectStore((state) => state.selectProject);
    const [projectName, setProjectName] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    };

    const handleSubmit = () => {
        if (!projectName) return;
        const newProject = {
            id: nanoid(),
            name: projectName,
        };
        addProject(newProject);
        selectProject(newProject.id);
        setProjectName("");
        onOpenChange(false);
    };
    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Add New Project</ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="Project Name"
                        type="text"
                        variant="faded"
                        value={projectName}
                        onChange={handleInputChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" type="submit" onPress={handleSubmit}>
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}