import React, { useState } from "react";
import toast from "react-hot-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
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

function AddProductPage() {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "fashion",
    description: "",
    productImageUrl: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.price ||
      !product.category ||
      !product.description ||
      !product.productImageUrl
    ) {
      toast.error("All fields are required");
      return;
    }

    // ✅ normalize + safe convert
    const cleanTitle = product.title.trim();
    const cleanDesc = product.description.trim();
    const cleanImg = product.productImageUrl.trim();

    const cleanCategory = String(product.category).toLowerCase().trim(); // ✅ IMPORTANT
    const cleanPrice = Number(product.price);
    const cleanQty = Math.max(1, Number(product.quantity || 1));

    if (Number.isNaN(cleanPrice) || cleanPrice <= 0) {
      toast.error("Price must be a valid number");
      return;
    }

    try {
      setLoading(true);

      const currentDate = new Date();

      await addDoc(collection(fireDB, "products"), {
        title: cleanTitle,
        price: cleanPrice, // ✅ store as number
        category: cleanCategory, // ✅ always lowercase
        description: cleanDesc,
        productImageUrl: cleanImg,
        quantity: cleanQty,
        date: currentDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: Timestamp.now(),
      });

      toast.success("Product added successfully ✅");

      setProduct({
        title: "",
        price: "",
        category: "fashion",
        description: "",
        productImageUrl: "",
        quantity: 1,
      });
    } catch (error) {
      console.log("ADD PRODUCT ERROR:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-pink-50 border border-pink-200 rounded-xl shadow-md p-6">
        <h2 className="text-center text-2xl font-bold text-pink-600 mb-6">
          Add Product
        </h2>

        <form className="space-y-3" onSubmit={addProduct}>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md"
          />

          <input
            type="text"
            name="productImageUrl"
            value={product.productImageUrl}
            onChange={handleChange}
            placeholder="Product Image Url"
            className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md"
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
            className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md resize-none"
          />

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full bg-pink-50 border border-pink-200 px-3 py-2 rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-md font-semibold hover:bg-pink-700 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
