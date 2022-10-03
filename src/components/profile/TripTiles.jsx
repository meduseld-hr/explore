

export default function TripTiles({ trip }) {

  return (<div style={{ display: "flex", flexDirection: "row", border: "2px solid black", margin: "1.2em" }}>
    <img style={{ height: "10vw", width: "10vw" }} src={trip.ThumbnailURL} alt="trip thumbnailURL pic" />
    <p>{trip.trip_name}</p>
  </div>)
}