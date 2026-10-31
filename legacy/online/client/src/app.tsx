import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import GamePage from './pages/Game/GamePage';
import LobbyPage from './pages/Lobby/LobbyPage';
import NotFound from './pages/NotFound/NotFound';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LobbyPage />} />
        <Route path="play" element={<GamePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
