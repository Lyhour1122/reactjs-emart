import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash, Minus, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { collection, Timestamp, doc, runTransaction } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

import {
  deleteFromCart,
  incrementQuantity,
  decrememntQuantity,
  clearCart,
} from "../../redux/cartSlice";

// helper: price -> number
const parsePrice = (val) => {
  if (val == null) return 0;
  const n = Number(String(val).replace("$", "").trim());
  return Number.isFinite(n) ? n : 0;
};

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart) || [];
  const user = JSON.parse(localStorage.getItem("users")) || null;

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ loader
  const [form, setForm] = useState({
    name: user?.name || "",
    address: "",
    pincode: "",
    phone: "",
  });

  const removeItem = (id) => dispatch(deleteFromCart(id));
  const minusQty = (id) => dispatch(decrememntQuantity(id));
  const plusQty = (id) => dispatch(incrementQuantity(id));

  const { subtotal, shipping, tax, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (sum, item) => sum + parsePrice(item.price) * (item.quantity ?? 1),
      0
    );
    const ship = cartItems.length > 0 ? 5 : 0;
    const t = sub * 0.06;
    const tot = sub + ship + t;
    return { subtotal: sub, shipping: ship, tax: t, total: tot };
  }, [cartItems]);

  const openBuyNow = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    setOpenModal(true);
  };

  const closeBuyNow = () => {
    if (!loading) setOpenModal(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // ✅ PLACE ORDER WITH LOADER
  const placeOrder = async () => {
    if (!form.name || !form.address || !form.pincode || !form.phone) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await runTransaction(fireDB, async (transaction) => {
        // 1️⃣ Check stock
        for (const item of cartItems) {
          const productRef = doc(fireDB, "products", String(item.id));
          const snap = await transaction.get(productRef);

          if (!snap.exists()) {
            throw new Error(`Product not found: ${item.title}`);
          }

          const currentStock = Number(snap.data().quantity ?? 0);
          const buyQty = Number(item.quantity ?? 1);

          if (currentStock < buyQty) {
            throw new Error(
              `Not enough stock for "${item.title}" (Available: ${currentStock})`
            );
          }
        }

        // 2️⃣ Deduct stock
        for (const item of cartItems) {
          const productRef = doc(fireDB, "products", String(item.id));
          const snap = await transaction.get(productRef);
          const currentStock = Number(snap.data().quantity ?? 0);

          transaction.update(productRef, {
            quantity: currentStock - Number(item.quantity ?? 1),
          });
        }

        // 3️⃣ Create order
        const orderRef = doc(collection(fireDB, "orders"));
        transaction.set(orderRef, {
          user: {
            uid: user?.uid || "",
            name: user?.name || form.name,
            email: user?.email || "",
          },
          customer: form,
          items: cartItems.map((p) => ({
            id: p.id,
            title: p.title,
            price: parsePrice(p.price),
            quantity: Number(p.quantity ?? 1),
            image: p.productImageUrl || "",
            category: p.category || "",
          })),
          summary: { subtotal, shipping, tax, total },
          status: "pending",
          createdAt: Timestamp.now(),
        });
      });

      toast.success("Order placed successfully ✅");
      dispatch(clearCart());
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items */}
        <section className="lg:col-span-8 bg-white rounded-lg shadow-sm border">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((product) => {
                const current = parsePrice(product.price);
                const qty = product.quantity ?? 1;

                return (
                  <li
                    key={product.id}
                    className="flex flex-col sm:flex-row gap-4 p-6"
                  >
                    <img
                      src={product.productImageUrl}
                      alt={product.title}
                      className="w-24 h-24 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {product.title}
                        </h3>

                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={20} />
                        </button>
                      </div>

                      <div className="mt-3 text-lg font-semibold">
                        ${current.toFixed(2)}
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => minusQty(product.id)}
                          disabled={qty <= 1}
                          className="px-3 py-2 border rounded"
                        >
                          <Minus size={16} />
                        </button>

                        <span>{qty}</span>

                        <button
                          onClick={() => plusQty(product.id)}
                          className="px-3 py-2 border rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Summary */}
        <aside className="lg:col-span-4 bg-white rounded-lg shadow-sm border p-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={openBuyNow}
            disabled={cartItems.length === 0}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Buy Now
          </button>
        </aside>
      </div>

      {/* ✅ MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative w-[92%] max-w-xl bg-blue-50 rounded-xl p-6">
            <button onClick={closeBuyNow} className="absolute right-3 top-3">
              <X size={20} />
            </button>

            <div className="space-y-3">
              {["name", "address", "pincode", "phone"].map((f) => (
                <input
                  key={f}
                  name={f}
                  value={form[f]}
                  onChange={onChange}
                  disabled={loading}
                  placeholder={f.toUpperCase()}
                  className="w-full p-3 rounded border"
                />
              ))}

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "BUY NOW"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
