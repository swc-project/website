export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type StripPrefix<
    T extends string,
    P extends string
> = T extends `${P}${infer R}` ? R : never;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
