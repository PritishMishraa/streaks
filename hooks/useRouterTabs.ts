"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { Key, useCallback } from 'react';

export function useRouterTabs(name: string) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const tabValue = searchParams.get(name) || '';

    const createQueryString = useCallback(
        (value: Key) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value as string);
            return params.toString();
        },
        [searchParams, name]
    );

    const setTabValue = (key: Key) => {
        const newQueryString = createQueryString(key);
        const newUrl = `${pathname}?${newQueryString}`;
        window.history.pushState(null, '', newUrl);
    };

    return { tabValue, setTabValue };
}