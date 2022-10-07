import { useState, useEffect } from "react";
import styled from "styled-components";
import TripRecommendations from "../components/trips/TripRecommendations";
import TripSidebarCard from "../components/trips/TripSidebarCard";
import SideBar from "../components/dashboard/Sidebar";
import api from "../functions/api";
import { useNavigate } from "react-router-dom";
import PostTrip from "../components/dashboard/Post-Trip/PostTrip.jsx";

export default function Trips() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tripsFromSearch, setTripsFromSearch] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  const [recommendedTrips, setRecommendedTrips] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [popularTrips, setPopularTrips] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    //USER Trips for sidebar
    api
      .get("/trips/")
      .then((response) => {
        console.log("mytrips", response.data);
        //sort completed trips
        const completed = [];
        response.data.forEach((trip) => {
          if (trip.completed) {
            completed.push(trip);
          }
        });
        setMyTrips(completed);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const makeNewTrip = (destination) => {
    api
      .post("/trips/", { tripName: destination })
      .then((response) => {
        let tripID = response.data.trip_id;
        navigate(`../dashboard/${tripID}/details`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function deleteTrip(tripId) {
    api
      .delete(`/trips/${tripId}`)
      .then(() => {
        setUpdate((update) => !update);
      })
      .catch((err) => console.log(err));
  }
  const markAsComplete = (tripId) => {
    api
      .put(`/trips/${tripId}/completed`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <SideBar>
        <SidebarWrapper>
          <Search
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Where to next?"
          />
          <Button
            onClick={() => {
              makeNewTrip(search);
            }}
          >
            Create New Trip
          </Button>
          <div>Your Past Trips</div>
          {myTrips.length === 0 ? (
            <div></div>
          ) : (
            myTrips.map((trip) => {
              return (
                <TripSidebarCard
                  key={trip.id}
                  trip={trip}
                  deleteTrip={deleteTrip}
                  markAsComplete={markAsComplete}
                />
              );
            })
          )}
        </SidebarWrapper>
      </SideBar>
      <Dashboard>
        <PostTrip />
      </Dashboard>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  /* border: 1px solid; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 1em;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
`;
const SidebarWrapper = styled.div`
  width: 100%;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-height: 60vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Dashboard = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
`;
const Search = styled.input`
  height: 30px;
  margin-top: 10px;
`;
const PlanSelector = styled.div`
  display: flex;
`;
const Selection = styled.div`
  flex: 1;
  /* border: 1px solid cyan; */
`;

const Button = styled.button`
  padding: 5px;
  margin: 10px;
  border-radius: 20px;
  color: ${(props) => props.theme.buttonColor};
  background-color: ${(props) => props.theme.button};
  cursor: pointer;
`;
