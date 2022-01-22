import React, { useRef } from "react";

const ChangePasswordForm = () => {
  const newPassRef = useRef();
  const currentPassRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const oldPassword = currentPassRef.current.value,
      newPassword = newPassRef.current.value;

    fetch(`${process.env.NEXT_PUBLIC_API}/user/change-password`, {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid h-96 place-content-center">
      <div className=" w-80">
        <form onSubmit={submitHandler}>
          <h5 className="text-center font-bold">Change password</h5>
          <div>
            <label className="block">New Password</label>
            <input
              name="password"
              type="password"
              className=" border border-gray-400 p-2 rounded-md mb-4 w-80"
              ref={newPassRef}
            />
          </div>
          <div>
            <label className="block">Current Password</label>
            <input
              name="password"
              type="password"
              className=" border border-gray-400 p-2 rounded-md mb-4 w-80"
              ref={currentPassRef}
            />
          </div>
          <button className="bg-indigo-800 text-white w-full p-2 rounded-md">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
