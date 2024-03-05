import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SVGLogo } from "../../svg/SVGLogo";
import { useUser } from "../../context/user";
import UserData from "./UserData";

type Props = {};

const Navbar = ({}: Props) => {
  const { user, login, isLoading } = useUser();
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link className="flex items-center text-gray-800" href="/">
              <SVGLogo />
              <span className="hidden lg:block h-6 ml-2 text-xl font-semibold">
                Side kick
              </span>
            </Link>

            {isLoading || !user?.user_metadata ? (
              <div className=" md:flex md:items-center md:gap-4">
                <Button onClick={login} disabled={isLoading}>
                  {isLoading ? "Loading...." : "Login"}
                </Button>
              </div>
            ) : (
              <UserData />
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
