import { signIn } from "@/auth/auth"
import { Button } from "@nextui-org/button"
import { GithubIcon } from "./icons"

export function GithubSignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github", { redirectTo: "/dashboard" })
            }}
        >
            <Button className="w-full" startContent={<GithubIcon />} type="submit">Signin with GitHub</Button>
        </form>
    )
} 