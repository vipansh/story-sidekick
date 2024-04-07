import React, { useEffect } from "react";

import { useUser } from "../@/context/user";

type Props = {};

const Login = ({}: Props) => {
  const { login } = useUser();

  useEffect(() => {
    login();

    return () => {};
  }, []);

  return <div></div>;
};

export default Login;
