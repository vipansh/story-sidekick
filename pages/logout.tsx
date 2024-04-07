import React, { useEffect } from "react";

import { useUser } from "../@/context/user";

type Props = {};

const Logout = ({}: Props) => {
  const { logout } = useUser();

  useEffect(() => {
    logout();
  }, []);

  return <div></div>;
};

export default Logout;
