import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyContext from "../../context/myContext";

const norm = (v) =>
  String(v ?? "")
    .toLowerCase()
    .trim();

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const context = useContext(MyContext);

  const products = useMemo(() => {
    const maybe = context?.getAllProduct;
    if (Array.isArray(maybe)) return maybe;
    if (typeof maybe === "function") {
      const res = maybe();
      return Array.isArray(res) ? res : [];
    }
    if (Array.isArray(context?.allProduct)) return context.allProduct;
    return [];
  }, [context]);

  const key = norm(categoryName);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => norm(p?.category) === key);
  }, [products, key]);

  return (
    <div className="pt-28 md:pt-36 pb-10 bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-white border hover:bg-blue-50"
          >
            ← Back
          </button>

          <div className="text-right">
            <h1 className="text-2xl font-semibold capitalize text-blue-700">
              {categoryName} Products
            </h1>
            <p className="text-blue-500 text-sm">
              Found: {filteredProducts.length}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-blue-500 mt-10 space-y-2">
            <p>
              No products found in{" "}
              <b className="capitalize text-blue-700">{categoryName}</b>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((item, index) => {
              const id = item?.id || item?._id || item?.uid || index;
              const price =
                item?.price !== undefined && item?.price !== null
                  ? item.price
                  : "0";

              return (
                <div
                  key={id}
                  className="border rounded-lg shadow-sm hover:shadow-md transition bg-white overflow-hidden"
                >
                  <img
                    src={item?.productImageUrl}
                    alt={item?.title || "Product"}
                    className="h-48 w-full object-cover cursor-pointer"
                    onClick={() => navigate(`/productinfo/${id}`)}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                  />

                  <div className="p-4">
                    <span className="text-xs text-blue-600 font-semibold capitalize">
                      {item?.category || "unknown"}
                    </span>

                    <h2 className="text-lg font-medium mt-1 line-clamp-1">
                      {item?.title || "Untitled product"}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-blue-700">
                      ${price}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Stock: {item?.quantity ?? 0}
                    </p>

                    <button
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
