/* eslint-disable prefer-const */
import { Product } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeDuplicates(array: Array<Product>) {
  let unique: Product[] = [];
  let ids: Array<string> = [];

  array.forEach(element => {
    if (!ids.includes(element.id)) {
      unique.push(element);
      ids.push(element.id);
    }
  });

  return unique as Array<Product>;
}
