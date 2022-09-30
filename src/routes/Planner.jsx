import styled from "styled-components"

export default function Planner() {
  return(
    <Container>
      <Sidebar>
        SIDEBAR
        <Stop>Stop 1</Stop>
        <Stop>Stop 2</Stop>
        <Stop>Stop 3</Stop>
      </Sidebar>
      <Content>
        Content goes here
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`
const Sidebar = styled.div`
  width: 20%;
  border: 1px solid cyan;
`
const Content = styled.div`
  flex: 1;
  border: 1px solid red;
`
const Stop = styled.div`

`