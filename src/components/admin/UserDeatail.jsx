import React, { useContext } from "react";
import toast from "react-hot-toast";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import MyContext from "../../context/myContext";

function UserDetail() {
  const { getAllUser } = useContext(MyContext);

  const formatDate = (t) => {
    const d = t?.toDate?.() || null;
    return d ? d.toLocaleDateString() : "—";
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    try {
      await deleteDoc(doc(fireDB, "users", id));
      toast.success("User deleted ✅");
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete user");
    }
  };

  const setRole = async (id, role) => {
    if (!id) return;
    try {
      await updateDoc(doc(fireDB, "users", id), { role });
      toast.success(`Role updated: ${role} ✅`);
    } catch (e) {
      console.log(e);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="border border-blue-100 rounded-xl overflow-hidden bg-white">
      <table className="w-full text-left">
        <thead className="bg-blue-50 text-blue-600">
          <tr>
            <th className="p-4 border-b border-blue-100 w-16">S.No</th>
            <th className="p-4 border-b border-blue-100">Name</th>
            <th className="p-4 border-b border-blue-100">Email</th>
            <th className="p-4 border-b border-blue-100 w-28">Role</th>
            <th className="p-4 border-b border-blue-100 w-32">Date</th>
            <th className="p-4 border-b border-blue-100 w-32">Action</th>
          </tr>
        </thead>

        <tbody>
          {!Array.isArray(getAllUser) || getAllUser.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-gray-500 text-center">
                No users found.
              </td>
            </tr>
          ) : (
            getAllUser.map((u, index) => {
              const role = (u?.role || "user").toLowerCase();

              return (
                <tr key={u?.id || index} className="hover:bg-blue-50/40">
                  <td className="p-4 border-b border-blue-50 text-blue-600">
                    {index + 1}
                  </td>

                  <td className="p-4 border-b border-blue-50 text-gray-700">
                    {u?.name || "—"}
                  </td>

                  <td className="p-4 border-b border-blue-50 text-gray-700">
                    {u?.email || "—"}
                  </td>

                  <td className="p-4 border-b border-blue-50 text-gray-700 capitalize">
                    {role}

                    <div className="mt-2 flex flex-col gap-2">
                      <button
                        onClick={() => setRole(u?.id, "admin")}
                        className="text-green-600 text-sm font-semibold hover:underline text-left"
                      >
                        Make Admin
                      </button>

                      <button
                        onClick={() => setRole(u?.id, "user")}
                        className="text-blue-600 text-sm font-semibold hover:underline text-left"
                      >
                        Make User
                      </button>
                    </div>
                  </td>

                  <td className="p-4 border-b border-blue-50 text-gray-700">
                    {formatDate(u?.time)}
                  </td>

                  <td className="p-4 border-b border-blue-50">
                    <button
                      onClick={() => handleDelete(u?.id)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetail;
