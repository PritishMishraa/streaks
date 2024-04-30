import { Project } from "@/components/project";
import CreateTask from "@/components/createTask";
import { Card, CardBody } from "@nextui-org/card";
import StatsAndHistory from "@/components/statsAndHistory";
import { TaskActivityCalendar } from "@/components/activityCalendar";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function AboutPage() {
	const session = await auth()
	if (!session) redirect('/')

	return (
		<>
			<div className="flex items-center gap-2">
				<Project />
			</div>
			<div className="flex w-full gap-4 mt-10 h-72">
				<CreateTask />
				<StatsAndHistory />
			</div>
			<Card className="w-full mt-10 max-w-7xl">
				<CardBody className="flex items-center p-12">
					<TaskActivityCalendar />
				</CardBody>
			</Card>
		</>
	);
}
