import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default function MapInfo ({marker: {name, photos = [], types, place_id, vicinity}}) {
  const photoUrl = photos.length > 0 ? photos[0].getUrl() : '';
  function handleAdd() {
    const stop = {
      name, type: types[0], place_id, photoUrl, vicinity
    }
    console.log('Adding stop: ',stop);
  }
  return (
    <Popup>
      <div>{name}</div>
      <Row>
        <Thumbnail src={photoUrl} />
        <Icon icon={faPlus} onClick={handleAdd}/>
      </Row>
    </Popup>
  )
}

const Popup = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
`
const Thumbnail = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Icon = styled(FontAwesomeIcon)`
  color: black;
  font-size: 50px;
  cursor: pointer;
`