import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function typed<T>(schema: z.ZodSchema<T>, data: T): T {
    return schema.parse(data);
}
