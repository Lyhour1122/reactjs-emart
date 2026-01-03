import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Fashion",
    image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    path: "/category/fashion",
  },
  {
    name: "Shirt",
    image: "https://cdn-icons-png.flaticon.com/512/892/892453.png",
    path: "/category/shirt",
  },
  {
    name: "Jacket",
    image: "https://cdn-icons-png.flaticon.com/512/892/892454.png",
    path: "/category/jacket",
  },
  {
    name: "Mobile",
    image: "https://cdn-icons-png.flaticon.com/512/545/545245.png",
    path: "/category/mobile",
  },
  {
    name: "Laptop",
    image: "https://cdn-icons-png.flaticon.com/512/689/689396.png",
    path: "/category/laptop",
  },
  {
    name: "Shoes",
    image: "https://cdn-icons-png.flaticon.com/512/892/892471.png",
    path: "/category/shoes",
  },
  {
    name: "Home",
    image: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    path: "/category/home",
  },
  {
    name: "Books",
    image: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    path: "/category/books",
  },
];

export default function Category() {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* hide scrollbar */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        <div
          className="
            hide-scrollbar
            flex items-center gap-8 overflow-x-auto pb-2
            md:overflow-x-visible md:justify-between
            [-ms-overflow-style:none] [scrollbar-width:none]
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(cat.path)}
              type="button"
              className="flex flex-col items-center flex-shrink-0 hover:opacity-90 active:scale-95 transition"
            >
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-sm hover:bg-blue-700 transition">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-12 h-12 object-contain"
                  draggable="false"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/48?text=IMG";
                  }}
                />
              </div>

              <p className="mt-2 text-sm md:text-base font-medium text-blue-700">
                {cat.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
