import { useParams, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import MyContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addToCart, deleteFromCart } from "../../redux/cartSlice";

// ⭐ Blue stars
function StarRow() {
  return (
    <div className="flex items-center gap-1 text-blue-500 mt-2">
      {[1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <svg
        className="w-5 h-5 text-gray-300"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </div>
  );
}

// ✅ cart quantity ALWAYS 1
const cleanProductForRedux = (item) => ({
  ...item,
  quantity: 1,
  stock: Number(item?.quantity ?? 0),
  time:
    item?.time && typeof item.time.toMillis === "function"
      ? item.time.toMillis()
      : item?.time ?? null,
});

export default function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllProduct } = useContext(MyContext);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart) || [];

  const product = useMemo(
    () => getAllProduct?.find((p) => String(p.id) === String(id)),
    [getAllProduct, id]
  );

  const inCart = useMemo(
    () => cartItems.some((x) => String(x.id) === String(id)),
    [cartItems, id]
  );

  const toggleCart = () => {
    if (!product?.id) return;

    if (inCart) {
      dispatch(deleteFromCart(product.id));
      toast.success("Removed from cart");
    } else {
      dispatch(addToCart(cleanProductForRedux(product)));
      toast.success("Added to cart");
    }
  };

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-5 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const outOfStock = Number(product.quantity) <= 0;

  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <img
              src={product.productImageUrl}
              alt={product.title}
              className="w-full h-[520px] object-cover rounded-lg"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            <StarRow />

            <p className="mt-4 text-2xl font-semibold text-blue-600">
              ${Number(product.price).toLocaleString()}
            </p>

            <p className="mt-2 text-sm text-blue-700 capitalize">
              Category: {product.category} • Stock: {product.quantity}
            </p>

            <h3 className="mt-6 font-semibold text-gray-700">Description :</h3>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              disabled={outOfStock}
              className={`mt-8 w-full font-semibold py-4 rounded-xl border transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                outOfStock
                  ? "bg-gray-200 text-gray-600 border-gray-300"
                  : inCart
                  ? "bg-blue-700 hover:bg-blue-800 text-white border-blue-800"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300"
              }`}
            >
              {outOfStock
                ? "Out of Stock"
                : inCart
                ? "Remove from cart"
                : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
