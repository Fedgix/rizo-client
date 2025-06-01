// Create a new file: context/UserContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [requireLogin, setRequireLogin] = useState(false);
  
  return (
    <UserContext.Provider value={{ requireLogin, setRequireLogin }}>
      {children}
    </UserContext.Provider>
  );
};