import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import MyContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

function Login() {
  const { loading, setloading } = useContext(MyContext);
  const navigate = useNavigate();

  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });

  // ✅ Show / Hide password
  const [showPassword, setShowPassword] = useState(false);

  const userLoginFunction = async (e) => {
    e.preventDefault();

    if (!userLogin.email || !userLogin.password) {
      toast.error("All fields are required");
      return;
    }

    setloading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      // 🔥 GET USER DATA FROM FIRESTORE
      const userRef = doc(fireDB, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User data not found in Firestore");
        return;
      }

      const userData = userSnap.data();

      // ✅ SAVE FOR NAVBAR
      localStorage.setItem(
        "users",
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userData?.name || "",
          role: userData?.role || "user",
        })
      );

      toast.success("Login successful");

      // ✅ ROLE BASED REDIRECT
      if (userData?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Wrong email or password");
      } else {
        toast.error(error.message || "Login failed");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {loading && <Loader />}

      {/* background blur blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

      {/* Gradient Glow Wrapper */}
      <div
        className="
          relative w-full max-w-md p-[2px] rounded-2xl
          bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
          shadow-[0_0_30px_rgba(59,130,246,0.45)]
        "
      >
        {/* Glass Card */}
        <div
          className="
            w-full px-6 py-8 rounded-2xl
            bg-white/65 backdrop-blur-xl
            border border-white/40
            shadow-xl
          "
        >
          <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
            Login
          </h2>

          <form className="space-y-4" onSubmit={userLoginFunction}>
            <input
              type="email"
              value={userLogin.email}
              onChange={(e) =>
                setuserLogin({ ...userLogin, email: e.target.value })
              }
              placeholder="Email"
              className="
                w-full bg-white/60 border border-blue-200 px-3 py-2 rounded-md
                outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
              "
            />

            {/* Password with Show / Hide */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={userLogin.password}
                onChange={(e) =>
                  setuserLogin({ ...userLogin, password: e.target.value })
                }
                placeholder="Password"
                className="
                  w-full bg-white/60 border border-blue-200 px-3 py-2 pr-20 rounded-md
                  outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  text-sm font-semibold text-blue-700
                  px-2 py-1 rounded
                  hover:bg-blue-50 transition
                "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="
                w-full py-2 rounded-md font-semibold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                transition active:scale-95 disabled:opacity-60
              "
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
