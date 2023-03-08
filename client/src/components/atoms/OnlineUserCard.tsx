import React from "react";
import type { TUserProfile } from "../../types";
import Avatar from "react-avatar";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: TUserProfile;
}

const OnlineUserCard: React.FC<Props> = props => {
  const { user, ...rest } = props;
  return (
    <div
      className="bg-cardLight dark:bg-cardDark flex w-72 min-w-fit items-center gap-x-3 rounded-md px-5 py-3"
      {...rest}
    >
      <Avatar
        name={user.fullName}
        className="rounded-full !bg-indigo-500 dark:!bg-teal-400"
        size="45"
        maxInitials={2}
      />
      <div className="flex flex-col gap-y-1">
        <p className="text-sm font-medium">{user.fullName}</p>
        <p className="text-xs font-light tracking-wider opacity-75">{user.role}</p>
      </div>
    </div>
  );
};

export default OnlineUserCard;
