import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGetUser, fetchUpdateUser } from "@/features/UserSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/lib/Proxy";
import { Pencil, X, CalendarIcon, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import GlobalLoader from "@/components/GlobalLoader/GlobalLoader";
import ServerErrorPage from "./Error/ServerErrorPage";

function UpdateUserPage() {
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getUser = useSelector((state: RootState) => state.user.getUser);
  const getUserStatus = useSelector(
    (state: RootState) => state.user.getUserStatus
  );

  const user = getUser.data;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: null as Date | null,
    avatar: null as File | null,
  });
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editDob, setEditDob] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  useEffect(() => {
    dispatch(fetchGetUser(userId || ""));
  }, []);

  const handleUpdateUser = () => {
    const name =
      !userData.name || userData.name === "" || userData.name === user.name;
    const email =
      !userData.email || userData.email === "" || userData.email === user.email;
    const dob = !userData.dob || userData.dob === null;
    const avatar = !userData.avatar || userData.avatar === null;

    if (name && email && dob && avatar) {
      toast.error("No changes detected.");
      return;
    }

    const updateUserPromise = dispatch(
      fetchUpdateUser({
        _id: userId as string,
        name: userData.name,
        email: userData.email,
        dob: userData.dob,
        avatar: userData.avatar,
      })
    ).unwrap();
    toast.promise(updateUserPromise, {
      loading: "Updating user...",
      success: (data: any) => {
        navigate("/?updated=true");
        return data.message || "User updated successfully.";
      },
      error: "Error updating user.",
    });
  };

  return (
    <>
      {getUserStatus === "loading" ? (
        <GlobalLoader />
      ) : getUserStatus === "failed" ? (
        <ServerErrorPage />
      ) : getUserStatus === "succeeded" ? (
        <Card className="w-full md:min-w-[550px] md:max-w-[90%]">
          <CardHeader>
            <CardTitle>Update User</CardTitle>
            <CardDescription>
              Created at: {format(user?.createdAt || new Date(), "PPP")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <div className="flex justify-between space-x-2">
                {editName ? (
                  <Input
                    type="text"
                    className="bg-muted/50"
                    placeholder="Name"
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm md:text-base">{user?.name}</p>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setEditName(!editName)}
                >
                  {editName ? <X /> : <Pencil />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <div className="flex justify-between space-x-2 ">
                {editEmail ? (
                  <Input
                    type="text"
                    placeholder="Email"
                    className="bg-muted/50"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm md:text-base">{user?.email}</p>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setEditEmail(!editEmail)}
                >
                  {editEmail ? <X /> : <Pencil />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Date of Birth</Label>
              <div className="flex justify-between space-x-2">
                {editDob ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={"w-full justify-start text-left font-normal"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {userData.dob ? (
                          format(userData.dob, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={userData.dob || undefined}
                        onSelect={(e: any) =>
                          setUserData({
                            ...userData,
                            dob: e,
                          })
                        }
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <p className="text-sm md:text-base">
                    {format(user?.dob, "PPP")}
                  </p>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setEditDob(!editDob)}
                >
                  {editDob ? <X /> : <Pencil />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Avatar</Label>
              <div className="flex justify-between space-x-2">
                {editAvatar ? (
                  <Input
                    type="file"
                    className="bg-muted/50"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        avatar: e.target.files?.[0] || null,
                      })
                    }
                  />
                ) : (
                  <img
                    className="w-52 rounded-lg "
                    src={`${baseUrl}/images/${user?.avatar}`}
                  />
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setEditAvatar(!editAvatar)}
                >
                  {editAvatar ? <X /> : <Pencil />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="sm" onClick={handleUpdateUser}>
              <RefreshCcw className="mr-0.5 h-4 w-4" />
              Update
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </>
  );
}

export default UpdateUserPage;
