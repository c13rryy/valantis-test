/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC /* , useCallback, */, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

const SearchForm: FC = () => {
  const [input, setInput] = useState<string>("");
  const [radio, setRadio] = useState<string>("name");
  const [query] = useDebounce(input, 300);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setInput("");
  }, [pathname]);

  useEffect(() => {
    if (!query) {
      router.push("/");
    } else {
      router.push(`/?page=1&search=${query}&type=${radio}`);
    }
  }, [query, radio]);

  return (
    <div className="flex flex-col-reverse gap-1">
      <div className="flex flex-col gap-3">
        <Input
          className="w-[400px]"
          name="search"
          id="search"
          placeholder="Search products"
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
        />

        <div className="flex justify-end">
          <Button
            variant={"default"}
            type="button"
            onClick={() => setInput("")}
          >
            Clear
          </Button>
        </div>
      </div>
      <RadioGroup
        onValueChange={value => setRadio(value)}
        defaultValue="name"
        className="flex items-center justify-end gap-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="name" id="r1" />
          <Label htmlFor="r1">name</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="price" id="r2" />
          <Label htmlFor="r2">price</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="brand" id="r3" />
          <Label htmlFor="r3">brand</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SearchForm;
