import { useEffect } from "react";
import axios from "../../setup/axios";

const UserList = () => {
  useEffect(() => {
    (async () => {
      const response = await axios.get("/ca/user");
      console.log(response);
    })();
  });
  return <>UserList</>;
};

export default UserList;
