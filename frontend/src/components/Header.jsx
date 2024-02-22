import { useUser } from "@/hooks/useUser";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const { user, LogOut} = useUser();
  return (
    <header>
      <div className="w-full bg-gray-800 flex text-white p-5 justify-between items-center">
        <div>
          <Link to={"/"}>Logo</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <l1>
                  <Link to={"/"}>Home</Link>
                </l1>
                <l1>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </l1>
                <l1>
                  <span className="font-bold">Welcome!, {user?.username}</span>
                </l1>
                <l1>
                  <button onClick={LogOut} >Logout</button>
                </l1>
              </>
            ) : (
              <>
                <l1>
                  <Link to={"/register"}>Register</Link>
                </l1>
                <l1>
                  <Link to={"/login"}>Login</Link>
                </l1>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
