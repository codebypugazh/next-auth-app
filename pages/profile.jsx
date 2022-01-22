import React from "react";
import { getSession } from "next-auth/react";
import ChangePasswordForm from "../components/ChangePasswordForm";

const Profile = () => {
  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  console.log("Server Session:", session);
  return { props: session };
}
export default Profile;
