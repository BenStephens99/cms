'use client'
import React, { createContext, useDeferredValue, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useEffect } from 'react';

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
  };

  const closeEditMode = () => {
    setEditMode(false);
  }

  const openEditMode = () => {
    setEditMode(true);
  }

  return (
    <EditModeContext.Provider value={{ editMode, toggleEditMode, closeEditMode, openEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};