import React from 'react';
import styled from 'styled-components';
import PostTrip from './Post-Trip/PostTrip.jsx';
import { Outlet } from 'react-router-dom';

export default function StagingArea({ stops, addStop, stop, setDistance, setDuration}) {
  return (
    <StagingAreaContainer>
      <Outlet context={{ stops, addStop, stop, setDistance, setDuration }} />
    </StagingAreaContainer>
  );
}

const StagingAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
