import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import FormPage from './FormPage';
import SecondPage from './SecondPage';
import { Alert, Container } from '@mui/material';

const RequireDetails: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();

  if (!user.name || !user.phone || !user.email) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 2 }}>
          Please enter your details before accessing the page.
        </Alert>
        <Navigate to="/" state={{ from: location }} replace />
      </Container>
    );
  }

  return children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route
          path="/second"
          element={
            <RequireDetails>
              <SecondPage />
            </RequireDetails>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

