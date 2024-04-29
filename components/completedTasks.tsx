import { Card, CardBody } from "@nextui-org/card";

export default function CompletedTasks() {
    const tasks = ["Task 1"];
    return (
        <div className="flex flex-col w-full h-full">
            <ul className="flex flex-col h-full gap-2 p-4 overflow-y-scroll bg-content2 rounded-medium">
                {tasks.map((task, index) => (
                    <li key={index}>
                        <Card>
                            <CardBody>
                                {task}
                            </CardBody>
                        </Card>
                    </li>
                ))}
            </ul>
        </div >
    )
}