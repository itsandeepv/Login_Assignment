import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css"
export default function Profile() {
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  function onLogOut() {
    auth.signOut();
    navigate("/sign-in");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile Details Updated");
    } catch (error) {
      toast.error("Could not Update the Profile Details");
    }
  }
  return (
    <>

   


      
      <section className="max-w-6xl  mx-auto flex justify-center items-center flex-col back_color">

      
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3 form_item">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"
                }`}
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div  >
             
              <div className="row text-center">
                <div className="col-12 d-flex justify-content-center">

            <p className="flex items-center mb-6 ">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 ease-in-out duration-200  ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply Change" : "Edit"}
                </span>
              </p>
            </div>

              <div className="col-12">
              
              <p
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              onClick={onLogOut}
              >
              <span className="btn btn-primary">
              Log Out

              </span>
              </p>
              </div>
              </div>
            </div>
          </form>
          </div>

      </section>

    </>
  );
}
