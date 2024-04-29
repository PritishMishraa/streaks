"use client";

import { useRouter } from "next/navigation";
import { HeartFilledIcon } from "./icons";
import { Button } from "@nextui-org/button";

export const LogButton = () => {
    const router = useRouter()
    return (
        <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
            onClick={() => router.push('/dashboard')}
        >
            Log In
        </Button>
    );
};