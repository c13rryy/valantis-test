"use server";

import { PAGE_SIZE } from "@/constants";
import { ProductProps } from "@/types";
import { removeDuplicates } from "@/lib/utils";
import { fetchFromAPI } from "@/lib/fetchFromAPI";

interface ProductResult {
  data: ProductProps | null;
  metadata: {
    hasNextPage: boolean;
    totalPages: number;
  };
  error?: string;
}

export const fetchProducts = async ({
  take = PAGE_SIZE,
  skip = 0,
  categoryName,
  page,
  searchData,
  searchType,
}: {
  take: number;
  skip: number;
  categoryName: string;
  page: number;
  searchData?: string;
  searchType?: string;
}): Promise<ProductResult> => {
  try {
    console.log(page);
    if (!searchData) {
      const reqBodyAll = {
        action: "get_ids",
        params: { offset: 0 },
      };

      const total = await fetchFromAPI(reqBodyAll);

      const totalPages = Math.ceil((total.result.length ?? 0) / take);

      const reqBody = {
        action: "get_ids",
        params: { offset: skip, limit: take },
      };

      const ids: { result: Array<string> } = await fetchFromAPI(reqBody);

      const reqBodySecond = {
        action: "get_items",
        params: { ids: ids.result },
      };

      const data: ProductProps = await fetchFromAPI(reqBodySecond);

      const products = removeDuplicates(data.result);
      if (categoryName === "all" && !searchData) {
        return {
          data: { result: products },
          metadata: {
            hasNextPage: skip + take < (total.result.length ?? 0),
            totalPages,
          },
        };
      }

      if (categoryName === "price-up") {
        const priceUp = products.sort((a, b) => b.price - a.price);

        return {
          data: { result: priceUp },
          metadata: {
            hasNextPage: skip + take < (total.result.length ?? 0),
            totalPages,
          },
        };
      }

      if (categoryName === "price-down") {
        const priceDown = products.sort((a, b) => a.price - b.price);

        return {
          data: { result: priceDown },
          metadata: {
            hasNextPage: skip + take < (total.result.length ?? 0),
            totalPages,
          },
        };
      }

      return {
        data: null,
        metadata: {
          hasNextPage: false,
          totalPages: 0,
        },
        error: "Non-existent category",
      };
    }

    if (searchData && searchType) {
      const startValue =
        searchType === "price"
          ? searchData
          : searchData.charAt(0).toUpperCase() + searchData.slice(1);

      let reqBody: {
        action: string;
        params?: {
          [key: string]: string | number;
        };
      } = {
        action: "filter",
      };

      if (searchType === "name") {
        reqBody = {
          ...reqBody,
          params: {
            product: startValue,
          },
        };
      } else if (searchType === "price") {
        reqBody = {
          ...reqBody,
          params: {
            price: Number(startValue),
          },
        };
      } else if (searchType === "brand") {
        reqBody = {
          ...reqBody,
          params: {
            brand: startValue,
          },
        };
      }

      const ids: { result: Array<string> } = await fetchFromAPI(reqBody);

      const reqBodySecond = {
        action: "get_items",
        params: { ids: ids.result },
      };

      const data: ProductProps = await fetchFromAPI(reqBodySecond);

      const products = removeDuplicates(data.result);

      const totalPages = Math.ceil((products.length ?? 0) / take);

      return {
        data: { result: products },
        metadata: {
          hasNextPage: skip + take < (products.length ?? 0),
          totalPages,
        },
      };
    }

    return {
      data: null,
      metadata: {
        hasNextPage: false,
        totalPages: 0,
      },
      error: "Something went wrong",
    };
  } catch (error) {
    return {
      data: null,
      metadata: {
        hasNextPage: false,
        totalPages: 0,
      },
      error: "Something went wrong",
    };
  }
};
