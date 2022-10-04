import styled from 'styled-components';

export default function EditProfileModal({ onSubmit, setEditInProgress }) {
  return <div>
    <GreyBackground onClick={() => { setEditInProgress(false) }} />
    <TopModal>
      <form>
        <label htmlFor="nickname">Update Nickname</label>
        <input type="text" />
        <br /><br />
        <input type="submit" value="Update Nickname" onClick={(e) => { onSubmit(e, "nickname") }} />
      </form>
      <form>
        <label htmlFor="picture">Update PictureURL PLACEHOLDER</label>
        <input type="text" />
        <br /><br />
        <input type="submit" value="Update Picture" onClick={(e) => { onSubmit(e, "picture") }} />
      </form>
    </TopModal>
  </div>
}

const GreyBackground = styled.div`
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 100;
  cursor: pointer;
`;

const TopModal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 101;
width: 50vw;
height: 30vh;
overflow: auto;
background-color: white;
`;