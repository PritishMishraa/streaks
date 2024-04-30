import { auth } from "@/auth/auth";
import { GithubSignIn } from "@/components/githubSignIn";
import { Card, CardBody } from "@nextui-org/card";
import { redirect } from "next/navigation";

export default async function AboutPage() {
    const session = await auth()
    if (session) redirect('/dashboard')

    return (
        <Card>
            <CardBody>
                <GithubSignIn />
            </CardBody>
        </Card>
    );
}