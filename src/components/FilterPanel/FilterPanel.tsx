"use client";

import { FILTER_DATA } from "@/data/filter";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const FilterPanel: FC = () => {
  const searchParams = useSearchParams();
  const categoryPage = searchParams.get("category");

  return (
    <ul className="flex items-center gap-4">
      {FILTER_DATA.map(el => (
        <li key={el.name}>
          <Link
            className={cn(
              "capitalize",
              categoryPage === el.name || (el.name === "all" && !categoryPage)
                ? buttonVariants({ variant: "destructive" })
                : buttonVariants({ variant: "default" })
            )}
            href={el.href}
          >
            {el.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FilterPanel;
