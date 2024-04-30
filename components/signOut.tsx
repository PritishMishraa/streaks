import { signOut } from "next-auth/react"

export function SignOut() {
    return <button className="w-full text-left" onClick={() => signOut()}>Signout</button>
}