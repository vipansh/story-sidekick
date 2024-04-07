import React from "react";

import { useUser } from "../../context/user";
import { capitalizeFirstLetter } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LayoutComponent } from "../ui/layout-comp";
import { Separator } from "../ui/separator";

type Props = {};

const UserData = ({}: Props) => {
  const { user, logout } = useUser();
  if (!user) return null;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={
                user?.user_metadata?.avatar_url ||
                "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>{user?.user_metadata?.full_name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <LayoutComponent layoutId="avatar-name">
              My Account
              <Separator />
              {capitalizeFirstLetter(user?.user_metadata?.full_name)}
            </LayoutComponent>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Buy Blogs (coming soon)</DropdownMenuItem>
          <DropdownMenuItem>Billing (coming soon)</DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserData;
