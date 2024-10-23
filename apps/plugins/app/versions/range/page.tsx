import { createCaller } from "@/lib/server";
import { Metadata } from "next";
import { RangeTable } from "./components/range-table";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const metadata: Metadata = {
    title: "Compat Ranges",
    description: "A list of compat ranges for SWC plugins.",
};

const RangePage = async () => {
    const api = await createCaller();
    const ranges = await api.compatRange.list();

    return <RangeTable ranges={ranges} />;
};

export default RangePage;
