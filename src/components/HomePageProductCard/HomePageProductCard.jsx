import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addToCart, deleteFromCart } from "../../redux/cartSlice";

// ✅ cart quantity ALWAYS 1, keep stock as "stock"
const cleanProductForRedux = (item) => {
  return {
    ...item,
    quantity: 1,
    stock: Number(item?.quantity ?? 0),
    time:
      item?.time && typeof item.time.toMillis === "function"
        ? item.time.toMillis()
        : item?.time ?? null,
  };
};

function HomePageProductCard() {
  const navigate = useNavigate();
  const { getAllProduct } = useContext(MyContext);

  const cartItems = useSelector((state) => state.cart) || [];
  const dispatch = useDispatch();

  const cartIdSet = useMemo(() => {
    return new Set(cartItems.map((x) => x.id));
  }, [cartItems]);

  const toggleCart = (item) => {
    const id = item?.id;
    if (!id) return;

    if (cartIdSet.has(id)) {
      dispatch(deleteFromCart(id));
      toast.success("Removed from cart");
    } else {
      dispatch(addToCart(cleanProductForRedux(item)));
      toast.success("Added to cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <section className="bg-blue-50 py-8">
      <h1 className="text-center mb-6 text-2xl font-semibold text-blue-800">
        Bestselling Product
      </h1>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -m-4">
          {getAllProduct?.map((item) => {
            const inCart = cartIdSet.has(item.id);

            return (
              <div
                key={item.id}
                className="p-4 w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <img
                    onClick={() => navigate(`/productinfo/${item.id}`)}
                    src={item.productImageUrl}
                    alt={item.title}
                    className="w-full h-56 object-cover cursor-pointer"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                  />

                  <div className="p-4">
                    <h2 className="tracking-widest text-xs font-medium text-blue-400 mb-2">
                      E-Store
                    </h2>

                    <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-blue-700 font-bold mt-2">
                      ${item.price}
                    </p>

                    <button
                      onClick={() => toggleCart(item)}
                      className={`mt-3 w-full text-white font-medium py-2 rounded-lg transition active:scale-95 ${
                        inCart
                          ? "bg-gray-700 hover:bg-gray-800"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {inCart ? "Remove From Cart" : "Add To Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {(!getAllProduct || getAllProduct.length === 0) && (
            <p className="text-center w-full text-blue-500 py-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomePageProductCard;
