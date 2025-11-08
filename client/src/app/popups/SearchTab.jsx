import { websiteLogo } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useSelector } from "react-redux";

const searchTap = () => {
  const searchDialogBox = useSelector(state => state.popup.searchDialogBox);
  const users = useSelector((state) => state.users.usersData);
  const [userName, setUserName] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  console.log(searchedUser);
  

  const onSearchInput = (e) => {
    const value = e.target.value;
    setUserName(value);

    if (!value.trim()) {
      setSearchedUser([]);
      return;
    }

    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(value.toLowerCase()));
    setSearchedUser(filteredUsers);
  }
  return searchDialogBox && (
    <div className='w-full'>
      <div className="flex w-[90%]">
        <Input onChange={(e) => onSearchInput(e)} name='search' value={userName} className='border-0 outline-none ring-0! shadow-none mt-2' placeholder='Search friends' />
      </div>
      <hr />

      <div className="p-2">
        {searchedUser.map((user) => (
          <div key={user._id} className="flex justify-between items-center">
            <div className="flex gap-2 items-center mt-3">
              <img src={user.profile ? user.profile : websiteLogo.dummyUserIcon} alt="profile" className="w-10 h-10 rounded-full object-cover object-center" />
              <span>{user.username}</span>
            </div>

            <div>
              <Button className='bg-transparent text-primary hover:bg-transparent cursor-pointer'>Follow</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default searchTap;