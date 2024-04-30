"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { DeleteIcon, EditIcon } from "./icons";

export default function CreateTask() {
    const [value, setValue] = useState("hemlo");
    const [tasks, setTasks] = useState<string[]>([]);
    const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setTasks([...tasks, value]);
        setIsSelectedList([...isSelectedList, false]);
        console.log("What are you working on today?:", value);
        setValue("hemlo");
    }

    function handleCheckboxChange(index: number) {
        const updatedIsSelectedList = [...isSelectedList];
        updatedIsSelectedList[index] = !updatedIsSelectedList[index];
        setIsSelectedList(updatedIsSelectedList);
    }

    return (
        <div className="flex flex-col w-1/2 gap-2">
            <form onSubmit={handleSubmit} className="flex items-end w-full gap-2">
                <Input
                    label="What are you working on today?"
                    labelPlacement="outside"
                    placeholder="Today, I am working on..."
                    size="lg"
                    value={value}
                    onValueChange={setValue}
                />
                <Button
                    variant="solid"
                    color="warning"
                    size="lg"
                    type="submit"
                    className="font-semibold tracking-wide text-foreground text-medium">
                    Create
                </Button>
            </form>
            <ul className="flex flex-col w-full h-full gap-2 p-4 overflow-y-auto bg-content2 rounded-medium">
                {tasks.map((task, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <Card>
                            <CardBody className="flex-row items-center w-full">
                                <div
                                    className="cursor-pointer grow"
                                    onClick={() => handleCheckboxChange(index)}
                                >
                                    <Checkbox
                                        isSelected={isSelectedList[index]}
                                        onValueChange={() => handleCheckboxChange(index)}
                                        color="success"
                                        size="md"
                                    >
                                        {task}
                                    </Checkbox>
                                </div>
                                <div className="flex gap-2 pr-2">
                                    <EditIcon />
                                    <DeleteIcon />
                                </div>
                            </CardBody>
                        </Card>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}