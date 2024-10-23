"use client";

import { ReactNode, useEffect, useState } from "react";

export const Dynamic = ({ children }: { children: ReactNode }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children} </>;
};
