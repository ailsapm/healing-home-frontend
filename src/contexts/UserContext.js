import React, { createContext, useState, useEffect } from 'react';

//create context that can be used to share user data with other components
export const UserContext = createContext();

//provider component - to provide user data to any child components that need it
export function UserProvider({ children }) {
   //user to store information about the logged in user (null if no one is logged in)
  const [user, setUser] = useState(null);
  //when checking  if user is logged in
  const [loading, setLoading] = useState(true);

  //check for logged in user when first loading component, using /me endpoint
  useEffect(() => {
    fetch('/me', { credentials: 'include' })    //send cookies with request
      .then(res => (res.ok ? res.json() : Promise.reject()))   //if response ok turn into json, if not, force error and go to catch block below
      .then(userData => setUser(userData))  //use the user data
      .catch(() => setUser(null))   //handle the error by setting user to null
      .finally(() => setLoading(false));  //finish the loading stage by setting it to false
  }, []);

  //handleLogout function where a delete request is sent to the /logout endpoint
  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',  //send cookies with request
    })
      .then((res) => {
        if (res.ok) {
          setUser(null);  //if logout successful, set user to null to clear the state
        } else {
          console.error('Logout failed'); //if logout fails, show error message in console
        }
      })
      .catch((err) => {
        console.error('Error during logout:', err);  //show any errors, like a network failure, in the console 
      });
  };

  //pass all user data and logout function to any child components using usercontext
  return (
    <UserContext.Provider value={{ user, setUser, loading, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}
