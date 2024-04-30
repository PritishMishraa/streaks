"use client";

import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { SignOut } from "./signOut";
import { DefaultSession } from "next-auth";

export default function Profile({ session }: { session: DefaultSession }) {
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        src={session.user?.image || undefined}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="gap-2 h-14">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{session.user?.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        My Settings
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        <SignOut />
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}