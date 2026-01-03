import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

import MyContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

function Signup() {
  const context = useContext(MyContext);
  const { loading, setloading } = context;

  const navigate = useNavigate();

  const [userSignup, setuserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // ✅ Show/Hide password
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Strength meter
  const strength = useMemo(() => {
    const p = userSignup.password || "";
    let score = 0;

    if (p.length >= 8) score += 1;
    if (p.length >= 12) score += 1;
    if (/[a-z]/.test(p)) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/\d/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;

    // cap score 0..5
    score = Math.min(score, 5);

    const percent = (score / 5) * 100;

    let label = "Very Weak";
    if (score === 1) label = "Weak";
    if (score === 2) label = "Fair";
    if (score === 3) label = "Good";
    if (score === 4) label = "Strong";
    if (score === 5) label = "Very Strong";

    // use blue theme; we vary width only (no fixed colors needed)
    return { score, percent, label };
  }, [userSignup.password]);

  const userSignupFunction = async (e) => {
    e.preventDefault();

    if (!userSignup.name || !userSignup.email || !userSignup.password) {
      toast.error("Please fill all fields");
      return;
    }

    setloading(true);

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const uid = users.user.uid;

      const user = {
        name: userSignup.name,
        email: userSignup.email,
        role: userSignup.role,
        uid,
        time: Timestamp.now(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      await setDoc(doc(fireDB, "users", uid), user);

      setuserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      toast.success("Signup Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Signup failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {loading && <Loader />}

      {/* soft blobs */}
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
            Signup
          </h2>

          <form className="space-y-4" onSubmit={userSignupFunction}>
            <input
              type="text"
              value={userSignup.name}
              onChange={(e) =>
                setuserSignup({ ...userSignup, name: e.target.value })
              }
              placeholder="Full Name"
              className="
                w-full bg-white/60 border border-blue-200 px-3 py-2 rounded-md
                outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
              "
            />

            <input
              type="email"
              value={userSignup.email}
              onChange={(e) =>
                setuserSignup({ ...userSignup, email: e.target.value })
              }
              placeholder="Email"
              className="
                w-full bg-white/60 border border-blue-200 px-3 py-2 rounded-md
                outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
              "
            />

            {/* Password with show/hide */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={userSignup.password}
                  onChange={(e) =>
                    setuserSignup({ ...userSignup, password: e.target.value })
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Strength meter */}
              <div className="text-left">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">
                    Strength:{" "}
                    <span className="font-semibold text-blue-700">
                      {userSignup.password ? strength.label : "—"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {userSignup.password?.length || 0}/12+
                  </p>
                </div>

                <div className="mt-2 h-2 w-full rounded-full bg-blue-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                    style={{
                      width: `${userSignup.password ? strength.percent : 0}%`,
                    }}
                  />
                </div>

                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-gray-600">
                  <li
                    className={
                      userSignup.password.length >= 8 ? "text-blue-700" : ""
                    }
                  >
                    • 8+ chars
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(userSignup.password) ? "text-blue-700" : ""
                    }
                  >
                    • Uppercase
                  </li>
                  <li
                    className={
                      /[a-z]/.test(userSignup.password) ? "text-blue-700" : ""
                    }
                  >
                    • Lowercase
                  </li>
                  <li
                    className={
                      /\d/.test(userSignup.password) ? "text-blue-700" : ""
                    }
                  >
                    • Number
                  </li>
                  <li
                    className={
                      /[^A-Za-z0-9]/.test(userSignup.password)
                        ? "text-blue-700"
                        : ""
                    }
                  >
                    • Symbol
                  </li>
                  <li
                    className={
                      userSignup.password.length >= 12 ? "text-blue-700" : ""
                    }
                  >
                    • 12+ chars
                  </li>
                </ul>
              </div>
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
