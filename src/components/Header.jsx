import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  });
  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div
      className="bg-white border-b shadow-sm sticky top-0 
    z-40"
    >
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <h3
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span  style={{color: "red"}}>Assig</span>nment
          </h3>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={` py-3 text-sm cursor-pointer font-semibold
            text-gray-400 border-b-[3px] border-b-transparent ${
              pathMathRoute("/") && "text-black border-b-red-500"
            }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
           
            <li
              className={` py-3 text-sm cursor-pointer font-semibold
            text-gray-400 border-b-[3px] border-b-transparent ${
              pathMathRoute("/sign-in") ||
              (pathMathRoute("/profile") && "text-black border-b-red-500")
            }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
