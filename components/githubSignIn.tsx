import { signIn } from "@/auth/auth"
import { Button } from "@nextui-org/button"
import { GithubIcon } from "./icons"
import { Tooltip } from "@nextui-org/tooltip"

export function GithubSignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github", { redirectTo: "/dashboard" })
            }}
        >
            <Tooltip content="Work In Progress">
                <Button disabled className="w-full" startContent={<GithubIcon />} type="submit">Signin with GitHub</Button>
            </Tooltip>
        </form>
    )
} 