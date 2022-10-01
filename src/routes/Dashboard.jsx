import { useContext } from "react";
import { UserContext } from "../contexts/user";
import Chat from '../components/dashboard/Chat.jsx';

export default function Dashboard () {
  const user = useContext(UserContext);
  return (
    <div>
      Dashboard is here for {user && user.name}
      <Chat />
    </div>
  )
}