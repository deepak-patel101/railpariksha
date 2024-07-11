import React from "react";
import FileUpload from "../components/Admin/Fileupload";
import { useUserContext } from "../Context/UserContext";
import { TbHandStop } from "react-icons/tb";
import AdminPage from "../components/Admin/AdminPage";
const Admin = () => {
  const { user } = useUserContext();
  return (
    <div className=" text-center mt-12" style={{ minHeight: "90vh" }}>
      {user?.login_type === "admin" ? (
        <div>
          <AdminPage style={{ width: "450px" }} />
        </div>
      ) : (
        <div className="">
          <div class="alert alert-danger" role="alert">
            <TbHandStop style={{ color: "red" }} /> Oops! unauthorized access,
            go back
          </div>
        </div>
      )}
    </div>
  );
};
export default Admin;
