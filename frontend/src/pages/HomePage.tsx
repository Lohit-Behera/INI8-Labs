import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchGetAllUsers } from "@/features/UserSlice";
import { baseUrl } from "@/lib/Proxy";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const getAllUser = useSelector((state: RootState) => state.user.getAllUsers);

  const users = getAllUser.data || [];

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchGetAllUsers());
    }
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users?.map((user: User) => (
        <div
          key={user._id}
          className="border rounded-lg p-2 md:p-4 flex space-x-2"
        >
          <Avatar className="my-auto">
            <AvatarImage src={`${baseUrl}/images/${user.avatar}`} />
            <AvatarFallback>
              {user.name[0] ? user.name[0].toUpperCase() : "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3>{user.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              {user.dob}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
