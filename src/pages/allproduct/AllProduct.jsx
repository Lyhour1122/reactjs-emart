import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext";

function Allproduct() {
  const navigate = useNavigate();
  const { getAllProduct } = useContext(MyContext);

  return (
    <div className="pt-36 pb-10 bg-blue-50 min-h-screen">
      <h1 className="text-center mb-8 text-2xl font-semibold text-blue-800">
        All Products
      </h1>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {getAllProduct?.length === 0 ? (
            <p className="text-center col-span-full text-blue-500">
              No products found.
            </p>
          ) : (
            getAllProduct.map((item) => (
              <div
                key={item.id}
                className="
                  relative rounded-xl p-[2px]
                  bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
                  transition-all duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                "
              >
                {/* Inner Card */}
                <div className="bg-white rounded-xl h-full shadow-md transition">
                  <img
                    src={item.productImageUrl}
                    alt={item.title}
                    className="h-48 w-full object-cover cursor-pointer rounded-t-xl"
                    onClick={() => navigate(`/productinfo/${item.id}`)}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                  />

                  <div className="p-4">
                    <span className="text-xs font-semibold text-blue-600 capitalize">
                      {item.category}
                    </span>

                    <h2 className="text-lg font-medium mt-1 line-clamp-1 text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-blue-700">
                      ${item.price}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Stock: {item.quantity}
                    </p>

                    <button
                      onClick={() => navigate("/cart")}
                      className="
                        mt-4 w-full
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        text-white py-2 rounded-lg
                        hover:from-blue-700 hover:to-indigo-700
                        transition active:scale-95
                      "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Allproduct;
