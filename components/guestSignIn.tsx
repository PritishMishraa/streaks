import { UserIcon } from "./icons"
import { redirect } from "next/navigation"
import { Button } from "@nextui-org/button"

export function GuestSignIn() {
    return (
        <form
            action={async () => {
                "use server"
                redirect('/dashboard')
            }}
        >
            <Button className="w-full" startContent={<UserIcon />} type="submit">Signin as Guest</Button>
        </form>
    )
} 