import React, { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import MyContext from "../../context/myContext";

function ProductDetail() {
  const { getAllProduct } = useContext(MyContext);

  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product deleted ✅");
    } catch (error) {
      console.log("DELETE ERROR:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="border border-blue-100 rounded-xl overflow-hidden bg-white">
      <table className="w-full text-left">
        {/* TABLE HEAD */}
        <thead className="bg-blue-50 text-blue-600">
          <tr>
            <th className="p-4 border-b border-blue-100 w-16">S.No</th>
            <th className="p-4 border-b border-blue-100 w-24">Image</th>
            <th className="p-4 border-b border-blue-100">Title</th>
            <th className="p-4 border-b border-blue-100 w-24">Price</th>
            <th className="p-4 border-b border-blue-100 w-24">Quantity</th>
            <th className="p-4 border-b border-blue-100 w-28">Category</th>
            <th className="p-4 border-b border-blue-100 w-40">Date</th>
            <th className="p-4 border-b border-blue-100 w-40 text-center">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {!Array.isArray(getAllProduct) || getAllProduct.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-4 text-gray-500 text-center">
                No products found.
              </td>
            </tr>
          ) : (
            getAllProduct.map((p, index) => (
              <tr key={p?.id || index} className="hover:bg-blue-50/40">
                {/* S.No */}
                <td className="p-4 border-b border-blue-50 text-blue-600">
                  {index + 1}
                </td>

                {/* Image */}
                <td className="p-4 border-b border-blue-50">
                  <img
                    src={p?.productImageUrl}
                    alt={p?.title || "Product"}
                    className="w-16 h-16 object-cover rounded-md border"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/64?text=No+Image";
                    }}
                  />
                </td>

                {/* Title */}
                <td className="p-4 border-b border-blue-50 text-gray-700">
                  {p?.title || "—"}
                </td>

                {/* Price */}
                <td className="p-4 border-b border-blue-50 text-gray-700">
                  ${Number(p?.price ?? 0)}
                </td>

                {/* Quantity */}
                <td className="p-4 border-b border-blue-50 text-gray-700">
                  {p?.quantity ?? 0}
                </td>

                {/* Category */}
                <td className="p-4 border-b border-blue-50 text-gray-700 capitalize">
                  {p?.category || "—"}
                </td>

                {/* Date */}
                <td className="p-4 border-b border-blue-50 text-gray-700">
                  {p?.date || "—"}
                </td>

                {/* Actions */}
                <td className="p-4 border-b border-blue-50">
                  <div className="flex items-center justify-center gap-4">
                    <Link
                      to={`/update-product/${p.id}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetail;
