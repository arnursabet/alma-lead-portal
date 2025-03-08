'use client';

import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from '@/features/leads/leadsSlice';
import authReducer from '@/features/auth/authSlice';

// Function to get leads from localStorage
const getInitialLeadsState = () => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return { items: [], loading: false, error: null };
  }
  
  try {
    const storedLeads = localStorage.getItem('leads');
    const items = storedLeads ? JSON.parse(storedLeads) : [];
    
    // Log the number of leads found in localStorage for debugging
    if (items.length > 0) {
      console.log(`Found ${items.length} leads in localStorage during initialization`);
    }
    
    return { items, loading: false, error: null };
  } catch (error) {
    console.error('Error loading initial state from localStorage:', error);
    return { items: [], loading: false, error: null };
  }
};

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    auth: authReducer,
  },
  preloadedState: {
    leads: getInitialLeadsState(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 