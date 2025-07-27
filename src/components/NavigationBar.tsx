import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  const navLinkStyle = {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#333',
    padding: '10px 15px',
    borderRadius: '8px',
    fontWeight: 600,
    transition: 'background-color 0.3s, color 0.3s',
  };

  const activeNavLinkStyle = {
    backgroundColor: '#1976d2',
    color: 'white',
  };

  return (
    <nav style={{ 
      background: '#f8f9fa', 
      padding: '15px 30px', 
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem', marginRight: '30px' }}>Instagram Analytics</h1>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          ...navLinkStyle,
          ...(isActive ? activeNavLinkStyle : {}),
        })}
      >
        프로필
      </NavLink>
      <NavLink
        to="/request"
        style={({ isActive }) => ({
          ...navLinkStyle,
          ...(isActive ? activeNavLinkStyle : {}),
        })}
      >
        크롤링 요청
      </NavLink>
    </nav>
  );
};

export default NavigationBar; 