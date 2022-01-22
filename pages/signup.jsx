import React, { useRef, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const createUser = async (email, password) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

const Signup = () => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    try {
      const result = await createUser(email, password);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="grid h-96 place-content-center">
      <form onSubmit={submitHandler}>
        <h5 className="text-center font-bold">Sign up</h5>
        <div>
          <label className="block">Email</label>
          <input
            name="email"
            className="border border-gray-400 p-2 rounded-md mb-4 w-96"
            ref={emailInputRef}
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            name="password"
            type="password"
            className=" border border-gray-400 p-2 rounded-md mb-4 w-96"
            ref={passwordInputRef}
          />
        </div>
        <button className="bg-indigo-800 text-white w-full p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
