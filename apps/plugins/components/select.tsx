"use client";

import { useMeasure } from "@react-hookz/web";
import { useCommandState } from "cmdk";
import { CheckIcon, ChevronsUpDown, PlusIcon } from "lucide-react";
import type { ComponentProps, FC, ReactNode } from "react";
import { useCallback, useId, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type SelectProperties = Omit<
    ComponentProps<typeof Popover>,
    "open" | "setOpen"
> & {
    readonly label?: string;
    readonly caption?: string;
    readonly value?: string[] | string;
    readonly data: readonly {
        readonly value: string;
        readonly label: string;
    }[];
    readonly renderItem?: (item: SelectProperties["data"][number]) => ReactNode;
    readonly disabled?: boolean;
    readonly type?: string;
    readonly trigger?: ReactNode;
    readonly onChange?: (value: string) => void;
    readonly onCreate?: (value: string) => void;
    readonly loading?: boolean;
    readonly exactSearch?: boolean;
    readonly className?: string;
};

const CreateEmptyState = ({
    onCreate,
}: {
    readonly onCreate: SelectProperties["onCreate"];
}) => {
    const search = useCommandState((state) => state.search);

    return (
        <div className="flex h-full w-full items-center justify-center">
            <button
                onClick={() => onCreate?.(search)}
                type="button"
                className="flex items-center gap-2"
            >
                <PlusIcon size={16} className="shrink-0" />
                <span>Create &quot;{search}&quot;</span>
            </button>
        </div>
    );
};

export const Select: FC<SelectProperties> = ({
    label,
    value,
    caption,
    data,
    disabled,
    onChange,
    type = "item",
    renderItem,
    trigger,
    loading,
    onCreate,
    exactSearch,
    className,
    ...properties
}) => {
    const id = useId();
    const [open, setOpen] = useState(false);
    const selected = data.find((item) => item.value === value);
    const [measurements, ref] = useMeasure<HTMLDivElement>();

    const handleSelect = useCallback(
        (newValue: string) => {
            setOpen(false);
            onChange?.(newValue);
        },
        [onChange]
    );

    const handleCreate = (newValue: string) => {
        setOpen(false);
        onCreate?.(newValue);
    };

    return (
        <Popover
            {...properties}
            open={disabled ? false : open}
            onOpenChange={(newOpen) =>
                disabled ? setOpen(false) : setOpen(newOpen)
            }
        >
            <PopoverTrigger asChild>
                {trigger ?? (
                    <div className="flex w-full flex-col gap-1.5" ref={ref}>
                        {label ? <Label htmlFor={id}>{label}</Label> : null}
                        <Button
                            type="button"
                            variant="outline"
                            id={id}
                            aria-expanded={open}
                            className={cn(
                                "flex w-full items-center justify-between gap-2 px-3",
                                className
                            )}
                            disabled={disabled}
                        >
                            {!selected && `Select a ${type}...`}
                            {selected && !renderItem ? selected.label : null}
                            {selected && renderItem ? (
                                <div className="flex-1 truncate text-left">
                                    {renderItem(selected)}
                                </div>
                            ) : null}
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                            )}
                        </Button>
                        {caption ? (
                            <p className="text-muted-foreground m-0 text-sm">
                                {caption}
                            </p>
                        ) : null}
                    </div>
                )}
            </PopoverTrigger>
            <PopoverContent
                className="w-full min-w-[200px] p-0"
                style={{
                    width: measurements?.width,
                }}
            >
                <Command>
                    <CommandInput placeholder={`Search for a ${type}...`} />
                    <CommandList className="max-h-[200px]">
                        {onCreate ? (
                            <CommandEmpty>
                                <CreateEmptyState onCreate={handleCreate} />
                            </CommandEmpty>
                        ) : (
                            <CommandEmpty>No results found.</CommandEmpty>
                        )}
                        <CommandGroup>
                            {data.map((item) => {
                                const active = Array.isArray(value)
                                    ? value.includes(item.value)
                                    : value === item.value;

                                return (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={() =>
                                            handleSelect(item.value)
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        <div className="flex-1 truncate text-left">
                                            {renderItem
                                                ? renderItem(item)
                                                : item.label}
                                        </div>
                                        <CheckIcon
                                            size={16}
                                            className={cn(
                                                "shrink-0",
                                                active
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
