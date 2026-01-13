import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const categoryList = [
  { name: "fashion" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
  { name: "home" },
  { name: "books" },
];

function UpdateProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "fashion",
    description: "",
    quantity: 1,
  });

  const getProductById = async () => {
    try {
      setLoading(true);
      const productRef = doc(fireDB, "products", id);
      const snap = await getDoc(productRef);

      if (!snap.exists()) {
        toast.error("Product not found");
        navigate("/admin-dashboard");
        return;
      }

      const data = snap.data();

      setProduct({
        title: data?.title || "",
        price: data?.price || "",
        productImageUrl: data?.productImageUrl || "",
        category: data?.category || "fashion",
        description: data?.description || "",
        quantity: data?.quantity ?? 1,
      });
    } catch (error) {
      console.log("GET PRODUCT ERROR:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProductById();
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.price ||
      !product.productImageUrl ||
      !product.category ||
      !product.description
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await updateDoc(doc(fireDB, "products", id), {
        title: product.title.trim(),
        price: product.price,
        productImageUrl: product.productImageUrl.trim(),
        category: product.category,
        description: product.description.trim(),
        quantity: Number(product.quantity),
        date: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: Timestamp.now(),
      });

      toast.success("Product updated ✅");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
          Update Product
        </h2>

        <form className="space-y-3" onSubmit={updateProduct}>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full bg-blue-50 border border-blue-200 px-3 py-2 rounded-md outline-none focus:border-blue-400"
          />

          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="w-full bg-blue-50 border border-blue-200 px-3 py-2 rounded-md outline-none focus:border-blue-400"
          />

          <input
            type="text"
            name="productImageUrl"
            value={product.productImageUrl}
            onChange={handleChange}
            placeholder="Product Image Url"
            className="w-full bg-blue-50 border border-blue-200 px-3 py-2 rounded-md outline-none focus:border-blue-400"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-blue-200 px-3 py-2 rounded-md outline-none focus:border-blue-400"
          >
            {categoryList.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows={4}
            className="w-full bg-blue-50 border border-blue-200 px-3 py-2 rounded-md outline-none focus:border-blue-400 resize-none"
          />

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full bg-blue-50 border border-blue-200 px-3 py-2 rounded-md outline-none focus:border-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductPage;
