import { Link } from "react-router-dom";
import { formatCurency } from "../../helpers/formatCurency";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addToCart } from "../../store/slices/cart/cartSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addTofavoritePage,
  removeFromfavoritePage,
} from "../../store/slices/favorites/favoriteSlice";
import type { ProductType } from "../../type/product";

type ProductPropsType = {
  product: ProductType;
  category:
    | "Enfance"
    | "Nos_Livres"
    | "Jeux-Cadeaux"
    | "Papeterie"
    | "Mes_favoris";
};

export default function Product({ product, category }: ProductPropsType) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isInFavorites = favorites.find((item) => item._id === product._id);
  const isInCart = cart.find((item) => item._id === product._id);

  function handleAdToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevents the <Link> default action
    e.stopPropagation();
    dispatch(addToCart(product._id));
  }
  const link = `/${category}/${product.title.replace(/ /g, "_")}`;

  return (
    <div
      key={product._id}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-[550px]"
    >
      <div className="h-64 overflow-hidden">
        <img
          width={350}
          height={300}
          src={product.image}
          alt={product.title}
          className="w-full h-full  hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-amber-400 mb-2 line-clamp-2">
            {product.title}
          </h2>
          {isInFavorites ? (
            <button
              onClick={() => dispatch(removeFromfavoritePage(product._id))}
              className="text-2xl focus:outline-none cursor-pointer"
            >
              <FaHeart className="text-red-500" />
            </button>
          ) : (
            <button
              onClick={() => dispatch(addTofavoritePage(product))}
              className="text-2xl focus:outline-none cursor-pointer"
            >
              <FaRegHeart className="text-white hover:text-red-500" />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-300 mb-1">par {product.author}</p>

        {/* 🆕 Category display */}
        <p className="text-xs text-purple-300 mb-1 italic">
          Catégorie : {product.category.name}
        </p>

        {product.numberOfPages && (
          <p className="text-xs text-gray-400 mb-3">
            {product.numberOfPages} pages
          </p>
        )}

        <div className="mt-auto">
          <span className="text-lg font-bold text-teal-400">
            {formatCurency(product.price)}
          </span>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <Link
            to={link}
            className="px-4 py-2.5 rounded-lg font-medium text-sm tracking-wide flex items-center justify-center
             bg-amber-700 hover:bg-amber-600 text-white shadow hover:shadow-md
             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Plus de détails
          </Link>

          {product.quantity > 0 && (
            <button
              disabled={isInCart ? true : false}
              onClick={handleAdToCart}
              className="px-4 py-2.5 rounded-lg font-medium text-sm tracking-wide  flex items-center justify-center
               bg-emerald-700 hover:bg-emerald-600 text-white shadow hover:shadow-md
               disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 cursor-pointer"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isInCart ? "M5 13l4 4L19 7" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                />
              </svg>
              {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
