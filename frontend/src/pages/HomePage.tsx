import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchDeleteUser, fetchGetAllUsers } from "@/features/UserSlice";
import { baseUrl } from "@/lib/Proxy";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { format } from "date-fns";
import GlobalLoader from "@/components/GlobalLoader/GlobalLoader";
import ServerErrorPage from "./Error/ServerErrorPage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let updated = searchParams.get("updated") || "";

  const getAllUser = useSelector((state: RootState) => state.user.getAllUsers);
  const getAllUserStatus = useSelector(
    (state: RootState) => state.user.getAllUsersStatus
  );

  const users = getAllUser.data || [];
  useEffect(() => {
    if (users.length === 0 || updated === "true") {
      dispatch(fetchGetAllUsers());
    }
  }, [updated, dispatch]);

  const handleDelete = (id: string) => {
    const deleteUserPromise = dispatch(fetchDeleteUser(id)).unwrap();
    toast.promise(deleteUserPromise, {
      loading: "Deleting user...",
      success: (data: any) => {
        navigate("/?updated=true");
        return data?.message || "User deleted successfully.";
      },
      error: (error: any) => {
        return error?.message || "Error deleting user.";
      },
    });
  };
  return (
    <>
      {getAllUserStatus === "loading" ? (
        <GlobalLoader />
      ) : getAllUserStatus === "failed" ? (
        <ServerErrorPage />
      ) : getAllUserStatus === "succeeded" ? (
        <>
          {users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {users?.map((user: User) => (
                <div
                  key={user._id}
                  className="border rounded-lg p-2 md:p-4 flex flex-col space-y-2"
                >
                  <div className="flex space-x-2">
                    <Avatar className="my-auto">
                      <AvatarImage src={`${baseUrl}/images/${user.avatar}`} />
                      <AvatarFallback>
                        {user.name[0] ? user.name[0].toUpperCase() : "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h1>{user.name}</h1>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {format(user.dob, "PPP")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/update/${user._id}`)}
                    >
                      <SquarePen className="mr-0.5 h-4 w-4" /> Update
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="mr-0.5 h-4 w-4" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete user and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(user._id)}
                            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
          {users.length === 0 && <p className="text-lg">No users found</p>}
        </>
      ) : null}
    </>
  );
}

export default HomePage;
