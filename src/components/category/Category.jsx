import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Fashion",
    image: "https://cdn-icons-png.flaticon.com/512/17944/17944876.png",
    path: "/category/fashion",
    color: "bg-pink-500 text-pink-600",
    hover: "hover:bg-pink-600",
  },
  {
    name: "Shirt",
    image: "https://cdn-icons-png.flaticon.com/512/17443/17443281.png",
    path: "/category/shirt",
    color: "bg-indigo-500 text-indigo-600",
    hover: "hover:bg-indigo-600",
  },
  {
    name: "Jacket",
    image: "https://cdn-icons-png.flaticon.com/512/863/863684.png",
    path: "/category/jacket",
    color: "bg-gray-700 text-gray-700",
    hover: "hover:bg-gray-800",
  },
  {
    name: "Mobile",
    image: "https://cdn-icons-png.flaticon.com/512/545/545245.png",
    path: "/category/mobile",
    color: "bg-emerald-500 text-emerald-600",
    hover: "hover:bg-emerald-600",
  },
  {
    name: "Laptop",
    image: "https://cdn-icons-png.flaticon.com/512/689/689396.png",
    path: "/category/laptop",
    color: "bg-sky-500 text-sky-600",
    hover: "hover:bg-sky-600",
  },
  {
    name: "Shoes",
    image: "https://cdn-icons-png.flaticon.com/512/8566/8566870.png",
    path: "/category/shoes",
    color: "bg-orange-500 text-orange-600",
    hover: "hover:bg-orange-600",
  },
  {
    name: "Home",
    image: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    path: "/category/home",
    color: "bg-teal-500 text-teal-600",
    hover: "hover:bg-teal-600",
  },
  {
    name: "Books",
    image: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    path: "/category/books",
    color: "bg-yellow-500 text-yellow-600",
    hover: "hover:bg-yellow-600",
  },
];

export default function Category() {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-5">
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
        >
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(cat.path)}
              type="button"
              className="flex flex-col items-center flex-shrink-0 transition active:scale-95"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md transition ${cat.color} ${cat.hover}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-12 h-12 object-contain"
                  draggable="false"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/48?text=IMG")
                  }
                />
              </div>

              <p
                className={`mt-2 text-sm md:text-base font-semibold ${
                  cat.color.split(" ")[1]
                }`}
              >
                {cat.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
