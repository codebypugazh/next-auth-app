import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("[Log from Navbar]", session, status);

  const handleSignout = () => {
    signOut();
  };

  return (
    <nav className="bg-gray-800 ">
      <div className="container p-3 mx-auto flex justify-between">
        <h1 className="text-white font-semibold">NextAuth</h1>
        <ul className="flex">
          <li>
            <Link href="/">
              <a className="px-2 text-gray-300 hover:text-white">Home</a>
            </Link>
          </li>
          {!session && status !== "loading" && (
            <>
              <li>
                <Link href="/signin">
                  <a className="px-2 text-gray-300 hover:text-white">Sign in</a>
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="px-2 text-gray-300 hover:text-white">
                  <a className="px-2 text-gray-300 hover:text-white">Sign up</a>
                </Link>
              </li>
            </>
          )}
          {session && status !== "loading" && (
            <>
              <li>
                <Link
                  href="/profile"
                  className="px-2 text-gray-300 hover:text-white">
                  <a className="px-2 text-gray-300 hover:text-white">
                    {session.user.email}
                  </a>
                </Link>
              </li>
              <li>
                <button
                  className="text-gray-300 hover:text-white"
                  onClick={handleSignout}>
                  Sign out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
