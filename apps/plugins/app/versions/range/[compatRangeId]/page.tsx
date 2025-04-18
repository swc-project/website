import { Metadata } from "next";
import { FC } from "react";
import { CompatRangeHeader } from "./components/compat-range-header";
import { CompatRangeTables } from "./components/compat-range-tables";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Compat Range",
  description: "Compat ranges for swc_core",
};

type CompatRangePageProps = {
  params: Promise<{
    compatRangeId: string;
  }>;
};

const CompatRangePage: FC<CompatRangePageProps> = async ({ params }) => {
  const { compatRangeId } = await params;

  return (
    <div className="grid gap-6">
      <CompatRangeHeader compatRangeId={compatRangeId} />
      <CompatRangeTables compatRangeId={compatRangeId} />
    </div>
  );
};

export default CompatRangePage;
