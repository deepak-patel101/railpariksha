import React from "react";
import FileUpload from "../components/Admin/Fileupload";
import { useUserContext } from "../Context/UserContext";
import { TbHandStop } from "react-icons/tb";
const Admin = () => {
  const { user } = useUserContext();
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      {user?.login_type === "admin" ? (
        <div>
          <>Admin</>
          <FileUpload />
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
