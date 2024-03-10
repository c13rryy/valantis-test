import { Product } from "@/types";
import { FC } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import FilterPanel from "../FilterPanel/FilterPanel";
import SearchForm from "../SearchForm/SearchForm";

interface ProductsComponentProps {
  data?: Product[];
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
  pageCategory?: string;
  error?: string;
  query?: string;
}

const Products: FC<ProductsComponentProps> = ({
  data,
  page,
  totalPages,
  hasNextPage,
  pageCategory,
  error,
  query,
}) => {
  return (
    <div className="flex flex-col gap-6 mt-[70px]">
      <div className="flex justify-between">
        <FilterPanel />
        <SearchForm />
      </div>
      {(data ?? []).length > 0 && (
        <div className="grid grid-cols-5 gap-[25px]">
          {data?.map(el => (
            <ProductCard
              key={el.id}
              title={el.product}
              price={el.price}
              brand={el.brand}
            />
          ))}
        </div>
      )}

      {(data ?? []).length === 0 && (
        <div
          className="
      "
        >
          <h1 className="text-2xl font-bold">Not found</h1>
        </div>
      )}
      {!error && !query && (
        <div className="flex gap-6 items-center justify-center">
          <Pagination
            page={page}
            pageCategory={pageCategory}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
          />
        </div>
      )}
    </div>
  );
};
export default Products;
