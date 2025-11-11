import { websiteLogo } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { sendFollowRequest } from "@/utils/followService";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const SearchTab = () => {
  const searchDialogBox = useSelector(state => state.popup.searchDialogBox);
  const loggedUser = useSelector(state => state.users.loggedUser);
  const [searchValue, setSearchValue] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const users = useSelector((state) => state.users.usersData);
  const followButtonLoading = useSelector(state => state.users.followButtonLoading);
  const dispatch = useDispatch();

  const onSearchInput = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSearchedUser([]);
      return;
    }

    const filterUser = users.filter((user) =>
      user.username.toLowerCase().trim().includes(value.toLowerCase().trim()));
    setSearchedUser(filterUser);
  };

  const getFollowStatus = (searchedEmail) => {
    const found = loggedUser.following.find(
      (f) => f.email === searchedEmail
    );

    if (!found) return "Follow";
    if (found.connection === true) return "Following";
    if (found.connection === false) return "Requested";
  };

  const followService = async (receiver_Id) => {
    await sendFollowRequest(dispatch, loggedUser._id, receiver_Id);
  }


  return searchDialogBox && (
    <div className="w-full">
      <div className="flex w-[90%]">
        <Input onChange={onSearchInput} name="search" value={searchValue} className="border-0 outline-none ring-0! shadow-none mt-2" placeholder="Search friends" />
      </div>
      <hr />
      <div className="p-2">
        {searchedUser.filter((user) => user.username !== loggedUser.username).map(user => {
          const status = getFollowStatus(user.email);
          return (
            <div key={user._id} className="flex justify-between items-center mt-3">
              <div className="flex gap-2 items-center">
                <img src={user.profile || websiteLogo.dummyUserIcon} alt="profile" className="w-10 h-10 rounded-full object-cover object-center" />
                <span>{user.username}</span>
              </div>
              {status === "Follow"
                ? <Button onClick={() => { followService(user._id); getFollowStatus(user.email) }} className="bg-transparent text-primary hover:bg-transparent cursor-pointer border w-[25%] md:w-[15%] text-xs h-7">{followButtonLoading ? <Spinner /> : 'Follow'}</Button>
                : ""
              }
              {status === "Following"
                ? <Button className="bg-transparent text-primary hover:bg-transparent cursor-pointer border w-[25%] md:w-[15%] text-xs h-7">Following</Button>
                : ""
              }
              {status === "Requested"
                ? <Button className="bg-transparent text-primary hover:bg-transparent cursor-pointer border w-[25%] md:w-[15%] text-xs h-7">Requested</Button>
                : ""
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchTab;
