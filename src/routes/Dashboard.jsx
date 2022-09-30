import { useContext } from "react";
import { UserContext } from "../contexts/user";


export default function Dashboard () {
  const user = useContext(UserContext);
  return (
    <div>
      Dashboard is here for {user && user.name}
    </div>
  )
}