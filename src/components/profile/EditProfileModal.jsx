import styled from 'styled-components';

export default function EditProfileModal({ onSubmit, setEditInProgress }) {
  return <CenterContainer>
      <Form>
        <label htmlFor="nickname">Update Nickname</label>
        <input type="text" />
        <br />
        <Input type="submit" value="Update Nickname" onClick={(e) => { onSubmit(e, "nickname") }} />
      </Form>
      <Form>
        <label htmlFor="picture">Update PictureURL</label>
        <input type="text" />
        <br />
        <Input type="submit" value="Update Picture" onClick={(e) => { onSubmit(e, "picture") }} />
      </Form>
  </CenterContainer>
}

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  flex-direction: row;
  padding: 10px;
`;

const Input = styled.input.attrs({
  type: 'submit'
})`
  padding: 5px;
  margin: 10px;
  color: #020331fd;
  border-radius: 20px;
  background-color: #4a81efc3;
  cursor: pointer;
`;
