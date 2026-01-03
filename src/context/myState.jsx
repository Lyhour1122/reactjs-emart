import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  // ✅ products
  const [getAllProduct, setGetAllProduct] = useState([]);

  // ✅ orders
  const [getorder, setGetorder] = useState([]);

  // ✅ users (admin)
  const [getAllUser, setGetAllUser] = useState([]);

  // ✅ realtime products
  const getAllProductFunction = () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const arr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGetAllProduct(arr);
          setLoading(false);
        },
        (error) => {
          console.log("PRODUCT SNAPSHOT ERROR:", error);
          setLoading(false);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.log("GET PRODUCTS ERROR:", error);
      setLoading(false);
      return () => {};
    }
  };

  // ✅ realtime orders (MATCH CartPage)
  const getallOrderFunction = () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "orders"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const arr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGetorder(arr);
          setLoading(false);
        },
        (error) => {
          console.log("ORDER SNAPSHOT ERROR:", error);
          setLoading(false);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.log("GET ORDERS ERROR:", error);
      setLoading(false);
      return () => {};
    }
  };

  // ✅ realtime users (you must have Firestore collection "users")
  const getAllUserFunction = () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "users"), orderBy("time", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const arr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGetAllUser(arr);
          setLoading(false);
        },
        (error) => {
          console.log("USER SNAPSHOT ERROR:", error);
          setLoading(false);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.log("GET USERS ERROR:", error);
      setLoading(false);
      return () => {};
    }
  };

  useEffect(() => {
    const unsubProducts = getAllProductFunction();
    const unsubOrders = getallOrderFunction();
    const unsubUsers = getAllUserFunction();

    return () => {
      if (typeof unsubProducts === "function") unsubProducts();
      if (typeof unsubOrders === "function") unsubOrders();
      if (typeof unsubUsers === "function") unsubUsers();
    };
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        setloading: setLoading,

        // products
        getAllProduct,
        setGetAllProduct,
        getAllProductFunction,

        // orders
        getorder,
        setGetorder,
        getallOrderFunction,

        // users
        getAllUser,
        setGetAllUser,
        getAllUserFunction,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
