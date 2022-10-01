import styled from "styled-components"


export default function TripSidebarCard () {

  return (
    <Card>
      <Thumbnail src='https://via.placeholder.com/150'/>
      <Detail>
        <div>Name here</div>
        <div>Location here</div>
      </Detail>
      <OpenTrip>GO</OpenTrip>
    </Card>
  )
}

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
`
const Card = styled.div`
  border: 1px solid red;
  display: flex;
`
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const OpenTrip = styled.button`

`