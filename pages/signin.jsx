import React, { useRef, useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
const SigninPage = () => {
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
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!result.error) {
        //do some auth state
        router.replace("/profile");
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="grid h-96 place-content-center">
      <div>
        <form onSubmit={submitHandler}>
          <h5 className="text-center font-bold">Sign in</h5>
          <div>
            <label className="block">Email</label>
            <input
              name="email"
              ref={emailInputRef}
              className="border border-gray-400 p-2 rounded-md mb-4 w-96"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              name="password"
              type="password"
              ref={passwordInputRef}
              className=" border border-gray-400 p-2 rounded-md mb-4 w-96"
            />
          </div>
          <button className="bg-indigo-800 text-white w-full p-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
