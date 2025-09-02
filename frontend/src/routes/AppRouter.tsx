import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Landing } from '../pages/Landing';
import { Kiosk } from '../pages/Kiosk';
import { Admin } from '../pages/Admin';
import { SuperAdmin } from '../pages/SuperAdmin';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="kiosk" element={<Kiosk />} />
          <Route path="admin" element={<Admin />} />
          <Route path="super-admin" element={<SuperAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};