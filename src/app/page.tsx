import { fetchProducts } from "@/actions/fetchProducts";
import Products from "@/components/Products/Products";
import { PAGE_SIZE } from "@/constants";

interface PageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Home(props: PageProps) {
  const pageNumber = Number(props.searchParams?.page || 1);
  const pageCategory = props.searchParams?.category || "all";
  const searchData = props.searchParams?.search || "";
  const searchType = props.searchParams?.type || "";

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata, error } = await fetchProducts({
    take,
    skip,
    categoryName: pageCategory,
    page: pageNumber,
    searchData,
    searchType,
  });

  return (
    <section className="px-[60px] mt-10 mb-10">
      <h1 className="text-5xl text-black font-bold text-center">
        All products
      </h1>
      <Products
        page={pageNumber}
        pageCategory={pageCategory}
        {...metadata}
        {...props.searchParams}
        error={error}
        data={data?.result}
        query={searchData}
      />
    </section>
  );
}
