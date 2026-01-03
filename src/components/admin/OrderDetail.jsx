import React, { useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import MyContext from "../../context/myContext";

function OrderDetail() {
  const { getorder } = useContext(MyContext);

  // ✅ Popup menu open for which order id
  const [openMenuId, setOpenMenuId] = useState(null);

  // ✅ Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    orderNumber: "",
  });

  const formatDate = (ts) => {
    const d = ts?.toDate?.();
    return d ? d.toLocaleString() : "—";
  };

  const closeMenu = () => setOpenMenuId(null);

  const openDeleteModal = (order) => {
    setDeleteModal({
      open: true,
      id: order?.id,
      orderNumber: order?.orderNumber || order?.id || "",
    });
    closeMenu();
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, id: null, orderNumber: "" });
  };

  const handleDelete = async () => {
    const id = deleteModal?.id;
    if (!id) return;

    try {
      await deleteDoc(doc(fireDB, "orders", id));
      toast.success("Order deleted ✅");
      closeDeleteModal();
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete order");
    }
  };

  const updateStatus = async (id, status) => {
    if (!id) return;
    try {
      await updateDoc(doc(fireDB, "orders", id), { status });
      toast.success(`Status updated: ${status} ✅`);
      closeMenu();
    } catch (e) {
      console.log(e);
      toast.error("Failed to update status");
    }
  };

  const orders = useMemo(() => {
    return Array.isArray(getorder) ? getorder : [];
  }, [getorder]);

  return (
    <div className="border border-blue-100 rounded-xl overflow-hidden bg-white">
      {/* ✅ click outside to close menu */}
      <div onClick={() => closeMenu()} className="w-full">
        <table className="w-full text-left">
          <thead className="bg-blue-50 text-blue-600">
            <tr>
              <th className="p-4 border-b border-blue-100 w-16">S.No</th>
              <th className="p-4 border-b border-blue-100 w-40">Order Id</th>
              <th className="p-4 border-b border-blue-100">Customer</th>
              <th className="p-4 border-b border-blue-100 w-28">Items</th>
              <th className="p-4 border-b border-blue-100 w-32">Total</th>
              <th className="p-4 border-b border-blue-100 w-32">Status</th>
              <th className="p-4 border-b border-blue-100 w-40">Date</th>
              <th className="p-4 border-b border-blue-100 w-28">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-gray-500 text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o, index) => {
                const items = o?.items || [];
                const total = Number(o?.summary?.total ?? 0);
                const email = o?.user?.email || "—";
                const name = o?.user?.name || o?.customer?.name || "—";
                const orderId = o?.orderNumber || o?.id || "—";
                const status = String(o?.status || "pending").toLowerCase();

                return (
                  <tr
                    key={o?.id || index}
                    className="hover:bg-blue-50/40 align-top"
                  >
                    <td className="p-4 border-b border-blue-50 text-blue-600">
                      {index + 1}
                    </td>

                    <td className="p-4 border-b border-blue-50 text-gray-700">
                      {orderId}
                      <div className="text-xs text-gray-400 mt-1">{email}</div>
                    </td>

                    <td className="p-4 border-b border-blue-50 text-gray-700">
                      <div className="font-semibold">{name}</div>
                      <div className="text-sm text-gray-500">
                        {o?.customer?.address || "—"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {o?.customer?.phone || "—"}
                      </div>
                    </td>

                    <td className="p-4 border-b border-blue-50 text-gray-700">
                      {items.length}
                      {items.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {items.slice(0, 2).map((it, i) => (
                            <div key={i} className="text-xs text-gray-500">
                              • {it?.title || "Item"} x {it?.quantity ?? 1}
                            </div>
                          ))}
                          {items.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{items.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="p-4 border-b border-blue-50 text-gray-700">
                      ${total.toFixed(2)}
                    </td>

                    <td className="p-4 border-b border-blue-50">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="p-4 border-b border-blue-50 text-gray-700">
                      {formatDate(o?.createdAt)}
                    </td>

                    {/* ✅ POPUP MENU */}
                    <td className="p-4 border-b border-blue-50">
                      <div
                        className="relative inline-block"
                        onClick={(e) => e.stopPropagation()} // stop outside click
                      >
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-md border border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold"
                          onClick={() =>
                            setOpenMenuId((prev) =>
                              prev === o?.id ? null : o?.id
                            )
                          }
                        >
                          ⋮
                        </button>

                        {openMenuId === o?.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                              onClick={() => updateStatus(o?.id, "confirmed")}
                            >
                              ✅ Mark Confirmed
                            </button>

                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                              onClick={() => updateStatus(o?.id, "cancelled")}
                            >
                              ❌ Mark Cancelled
                            </button>

                            <div className="h-px bg-gray-100" />

                            <button
                              className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 font-semibold"
                              onClick={() => openDeleteModal(o)}
                            >
                              🗑 Delete Order
                            </button>

                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-500"
                              onClick={() => closeMenu()}
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ CUSTOM DELETE MODAL (NO window.confirm) */}
      {deleteModal.open && (
        <div
          className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4"
          onClick={closeDeleteModal}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-800">
              Delete this order?
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Order:{" "}
              <span className="font-semibold text-gray-700">
                {deleteModal.orderNumber || deleteModal.id}
              </span>
            </p>
            <p className="text-sm text-red-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
