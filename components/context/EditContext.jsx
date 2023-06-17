'use client'
import React, { createContext, useDeferredValue, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useEffect, useContext } from 'react';

export const EditModeContext = createContext();


// Create a provider component
export const EditModeProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => { 
    if (!user) {
      setEditMode(false);
    }
  })

  const toggleEditMode = () => {
    setEditMode(!editMode);
    console.log(editMode)
  };

  return (
    <EditModeContext.Provider value={{ editMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};