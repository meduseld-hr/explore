import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { useOutletContext } from "react-router-dom";


const DarkmodeToggle = () => {
  const [checked, setChecked] = useState(false);
  const { theme, setTheme } = useOutletContext();

  const handleChange = (e) => {
    setChecked(e.target.checked);
    switch (theme) {
      case 'light':
        setTheme('dark')
        break;
      case 'dark':
        setTheme('light')
        break;
    }
  };

  return (
    <Label>
      <span>Current theme is {theme}</span>
      <Input checked={checked} type="checkbox" onChange={handleChange} />
      <Switch />
    </Label>
  );
};

export default DarkmodeToggle;

  const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  `;

  const Switch = styled.div`
    position: relative;
    width: 60px;
    height: 28px;
    background: white;
    border-radius: 32px;
    padding: 4px;
    transition: 300ms all;

    &:before {
      transition: 300ms all;
      content: "";
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 35px;
      top: 50%;
      left: 0px;
      background: white;
      border: solid;
      border-width: thin;
      transform: translate(0, -50%);
    }
  `;

  const Input = styled.input`
    opacity: 0;
    position: absolute;

    &:checked + ${Switch} {
      background: darkgrey;

      &:before {
        transform: translate(32px, -50%);
      }
    }
  `;