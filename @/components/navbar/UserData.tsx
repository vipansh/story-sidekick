import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "../../context/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { capitalizeFirstLetter } from "../../lib/utils";
import { LayoutComponent } from "../ui/layout-comp";

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
              {user?.user_metadata?.name}
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
