import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext"; // ✅ adjust path if needed

const getProductTitle = (p) =>
  (p?.title || p?.name || p?.productName || "").toString();

const getProductImage = (p) =>
  p?.productImageUrl ||
  p?.imageUrl ||
  p?.image ||
  (Array.isArray(p?.images) ? p.images[0] : "") ||
  "";

const SearchBar = () => {
  const navigate = useNavigate();
  const { getAllProduct, loading } = useContext(MyContext);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return (getAllProduct || [])
      .filter((p) => getProductTitle(p).toLowerCase().includes(q))
      .slice(0, 8);
  }, [search, getAllProduct]);

  const handleSelect = (product) => {
    setSearch("");
    setOpen(false);

    // ✅ change this route to your real product detail route
    navigate(`/productinfo/${product.id}`);
  };

  return (
    <div className="relative">
      {/* Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder={loading ? "Loading products..." : "Search products..."}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)} // ✅ allow click
          className="bg-gray-200 px-3 py-2 w-96 outline-none text-black rounded"
        />
      </div>

      {/* Dropdown */}
      {open && search.trim() && (
        <div className="flex justify-center">
          <div className="absolute bg-white w-96 mt-2 shadow-lg rounded overflow-hidden z-50">
            {filtered.length ? (
              filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()} // ✅ keep input from losing click
                  onClick={() => handleSelect(item)}
                  className="w-full text-left p-2 hover:bg-gray-100 flex items-center gap-3"
                >
                  {/* image */}
                  <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                    {getProductImage(item) ? (
                      <img
                        src={getProductImage(item)}
                        alt={getProductTitle(item)}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No img</span>
                    )}
                  </div>

                  {/* name + price */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {getProductTitle(item) || "Untitled product"}
                    </div>
                    {item?.price != null && (
                      <div className="text-xs text-gray-500">
                        ${String(item.price)}
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="p-2 text-gray-500">
                {loading ? "Loading..." : "No results found"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
