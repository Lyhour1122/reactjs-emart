import { useContext, useMemo } from "react";
import MyContext from "../../context/myContext";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("users")) || {};
  const { loading, getorder } = useContext(MyContext);

  // ✅ filter only this user's orders
  const myOrders = useMemo(() => {
    if (!Array.isArray(getorder)) return [];
    const myEmail = (user?.email || "").toLowerCase().trim();

    return getorder.filter((o) => {
      const email = (o?.user?.email || "").toLowerCase().trim();
      return email === myEmail;
    });
  }, [getorder, user?.email]);

  const formatDate = (ts) => {
    const d = ts?.toDate?.();
    return d ? d.toLocaleDateString() : "—";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
      {/* Profile */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col items-center text-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="text-gray-800 font-medium">
            <p>
              <span className="font-semibold">Name :</span> {user?.name || "—"}
            </p>
            <p>
              <span className="font-semibold">Email :</span>{" "}
              {user?.email || "—"}
            </p>
            <p>
              <span className="font-semibold">Role :</span> {user?.role || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between mt-10 mb-5">
        <h2 className="text-3xl font-extrabold text-gray-900">Order Details</h2>
        {loading && (
          <span className="text-sm text-gray-500 font-medium">Loading...</span>
        )}
      </div>

      {/* Empty */}
      {!loading && myOrders.length === 0 && (
        <div className="bg-white border rounded-2xl p-6 text-gray-600">
          No orders found.
        </div>
      )}

      {/* Orders */}
      <div className="space-y-6">
        {myOrders.map((order, idx) => {
          const items = order?.items || [];
          const orderId = order?.orderNumber || order?.id || `Order-${idx + 1}`;
          const total = Number(order?.summary?.total ?? 0);
          const status = order?.status || "pending";

          return (
            <div
              key={order?.id || orderId}
              className="border rounded-2xl overflow-hidden bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left */}
                <div className="md:col-span-4 bg-blue-50 p-6 border-b md:border-b-0 md:border-r">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">
                        Order Id
                      </p>
                      <p className="text-sm text-gray-800">{orderId}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 font-semibold">
                        Date
                      </p>
                      <p className="text-sm text-gray-800">
                        {formatDate(order?.createdAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 font-semibold">
                        Total Amount
                      </p>
                      <p className="text-sm text-gray-800">${total}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 font-semibold">
                        Order Status
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          status === "confirmed"
                            ? "text-green-600"
                            : status === "cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="md:col-span-8 p-6">
                  <div className="space-y-5">
                    {items.map((item, i) => {
                      const name = item?.title || item?.name || "Item";
                      const img = item?.image || item?.productImageUrl || "";
                      const qty = item?.quantity ?? 1;
                      const price = item?.price ?? 0;

                      return (
                        <div
                          key={item?.id || i}
                          className="flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-50">
                              {img ? (
                                <img
                                  src={img}
                                  alt={name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                  No Image
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-gray-900">
                                {name}
                              </p>
                              <p className="text-sm text-gray-400 mt-2">
                                x {qty}
                              </p>
                            </div>
                          </div>

                          <div className="font-semibold text-gray-900">
                            ${price}
                          </div>
                        </div>
                      );
                    })}

                    {items.length === 0 && (
                      <p className="text-gray-500">No items in this order.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
