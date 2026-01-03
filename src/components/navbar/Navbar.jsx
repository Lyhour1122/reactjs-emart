import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users")) || null;
  const navigate = useNavigate();

  // ✅ Get cart items from Redux
  const cartItems = useSelector((state) => state.cart) || [];

  // ✅ Calculate total quantity
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold">
            E-Store
          </Link>

          {/* Nav */}
          <ul className="flex flex-wrap items-center gap-x-4 text-white font-medium text-sm md:text-md">
            <li>
              <Link to="/" className="hover:text-blue-200">
                Home
              </Link>
            </li>

            <li>
              <Link to="/allproduct" className="hover:text-blue-200">
                All Product
              </Link>
            </li>

            {/* NOT logged in */}
            {!user && (
              <>
                <li>
                  <Link to="/signup" className="hover:text-blue-200">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-blue-200">
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* LOGGED IN */}
            {user && (
              <>
                <li>
                  <Link
                    to={
                      user?.role === "admin"
                        ? "/admin-dashboard"
                        : "/user-dashboard"
                    }
                    className="hover:text-blue-200"
                  >
                    {user?.name}
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={logout}
                    className="hover:text-blue-200"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Cart */}
            <li>
              <Link to="/cart" className="hover:text-blue-200 font-semibold">
                Cart ({cartCount})
              </Link>
            </li>
          </ul>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
