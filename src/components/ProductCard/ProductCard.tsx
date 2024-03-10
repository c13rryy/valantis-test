import { FC } from "react";

interface ProductCardProps {
  title: string;
  price: number;
  brand?: string;
}

const ProductCard: FC<ProductCardProps> = ({ title, price, brand }) => {
  return (
    <div className="rounded-[20px] flex flex-col gap-4 px-4 py-6 bg-gray-400">
      <div className="bg-black h-[200px] w-full flex justify-center items-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-white">{title}</h3>
        <div className="px-2 py-1 border-[1px] border-solid border-white rounded-xl cursor-pointer hover:border-black brand-block w-fit">
          <span className="text-white">{brand ?? "no-brand"}</span>
        </div>
      </div>
      <p className="text-sm text-white font-medium">{price}</p>
    </div>
  );
};

export default ProductCard;
