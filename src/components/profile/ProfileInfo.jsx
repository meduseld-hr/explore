import TripTiles from "./TripTiles.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";

const dummyDataTripsUsers = {
  results: [
    {
      "id": 1,
      "trip_name": "Going to Madrid",
      "ThumbnailURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLOPKXq9Izs3dns9rgXXeRy5Jlmhiho-hAdg&usqp=CAU"
    },
    {
      "id": 2,
      "trip_name": "On My Way to California",
      "ThumbnailURL": "https://picsum.photos/200"
    },
    {
      "id": 3,
      "trip_name": "Brazil Here I Come!",
      "ThumbnailURL": "https://picsum.photos/200"
    }
  ]
}



export default function ProfileInfo() {
  const trips = dummyDataTripsUsers.results;
  const user = useContext(UserContext);
  let [editInProgress, setEditInProgress] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('target is -->', e);
    console.log(e.target.form[0].value, 'is the nickname')
    console.log(e.target.form[1].value, 'is the picture url placeholder')
  }

  // console.log('user is -->', user)
  return (
    <div style={{ maxWidth: "70%" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* user.picture??? */}
        <img style={{ height: "10vw", width: "10vw" }} src={"https://picsum.photos/200"} alt="profile pic" />
        {/* user.nickname */}
        <p>Username: "THIS IS MY PLACEHOLDER NICKNAME"</p>
      </div>
      <button onClick={() => { setEditInProgress(true) }}>Update Profile</button>
      {editInProgress ? <EditProfileModal onSubmit={onSubmit} setEditInProgress={setEditInProgress} /> : <div></div>}
      {trips.map((trip) => { return (<TripTiles key={trip.id} trip={trip} />) })}
    </div>
  )
}

