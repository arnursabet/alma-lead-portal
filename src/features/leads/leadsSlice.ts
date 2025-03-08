'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Lead, LeadStatus, VisaType } from './types';
import { RootState } from '@/store';

interface LeadsState {
  items: Lead[];
  loading: boolean;
  error: string | null;
}

// Helper function to get leads from localStorage
const getLeadsFromLocalStorage = (): Lead[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedLeads = localStorage.getItem('leads');
    return storedLeads ? JSON.parse(storedLeads) : [];
  } catch (error) {
    console.error('Error retrieving leads from localStorage:', error);
    return [];
  }
};

// Helper function to save leads to localStorage
const saveLeadsToLocalStorage = (leads: Lead[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('leads', JSON.stringify(leads));
  } catch (error) {
    console.error('Error saving leads to localStorage:', error);
  }
};

const initialState: LeadsState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async (_, { rejectWithValue }) => {
    try {
      // Get leads from localStorage first
      const localStorageLeads = getLeadsFromLocalStorage();
      
      // Try to fetch from API
      try {
        const response = await fetch('/api/leads?admin=true', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const apiLeads = await response.json();
          
          // If we have any leads in localStorage, merge them with API leads
          if (localStorageLeads.length > 0) {
            // Create a map of existing IDs to avoid duplicates
            const existingIdsMap = new Map(apiLeads.map((lead: Lead) => [lead.id, true]));
            
            // Add localStorage leads that don't exist in API response
            const combinedLeads = [...apiLeads];
            localStorageLeads.forEach(localLead => {
              if (!existingIdsMap.has(localLead.id)) {
                combinedLeads.push(localLead);
              }
            });
            
            // Save the combined leads back to localStorage to keep it in sync
            saveLeadsToLocalStorage(combinedLeads);
            
            return combinedLeads;
          }
          
          // If no localStorage leads, just return API leads
          return apiLeads;
        }
      } catch {
        console.log('API fetch failed, using localStorage instead');
      }
      
      // If API failed or returned no results, return localStorage leads
      return localStorageLeads;
    } catch {
      return rejectWithValue('Failed to fetch leads. Please try again later.');
    }
  }
);

export const createLead = createAsyncThunk(
  'leads/createLead',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Try to submit to API first (maintain existing functionality)
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Also save to localStorage
          const existingLeads = getLeadsFromLocalStorage();
          const updatedLeads = [...existingLeads, data];
          saveLeadsToLocalStorage(updatedLeads);
          
          return data;
        }
      } catch {
        console.log('API submission failed, using localStorage instead');
      }
      
      // Fall back to localStorage if API fails
      // Create a new lead with the form data
      const formEntries = Object.fromEntries(formData.entries());
      
      // Create a unique ID (simple implementation)
      const newId = `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newLead: Lead = {
        id: newId,
        firstName: formEntries.firstName as string,
        lastName: formEntries.lastName as string,
        email: formEntries.email as string,
        linkedin: formEntries.linkedin as string,
        interestedVisas: JSON.parse(formEntries.interestedVisas as string) as VisaType[],
        additionalInfo: (formEntries.additionalInfo as string) || '',
        status: LeadStatus.PENDING,
        createdAt: new Date().toISOString(),
        ...(formEntries.country ? { country: formEntries.country as string } : {}),
      };
      
      // Save to localStorage
      const existingLeads = getLeadsFromLocalStorage();
      const updatedLeads = [...existingLeads, newLead];
      saveLeadsToLocalStorage(updatedLeads);
      
      return newLead;
    } catch {
      return rejectWithValue('Failed to create lead. Please try again later.');
    }
  }
);

export const updateLeadStatus = createAsyncThunk(
  'leads/updateLeadStatus',
  async ({ leadId, status }: { leadId: string; status: LeadStatus }, { rejectWithValue }) => {
    try {
      // Try API first
      try {
        const response = await fetch(`/api/leads/${leadId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Also update localStorage to keep it in sync
          const storageLeads = getLeadsFromLocalStorage();
          const updatedLeads = storageLeads.map(lead => 
            lead.id === leadId ? { ...lead, status } : lead
          );
          saveLeadsToLocalStorage(updatedLeads);
          
          return data;
        }
      } catch {
        console.log('API update failed, using localStorage instead');
      }
      
      // Fall back to localStorage
      const leads = getLeadsFromLocalStorage();
      const leadToUpdate = leads.find(lead => lead.id === leadId);
      
      if (!leadToUpdate) {
        return rejectWithValue(`Lead with ID ${leadId} not found`);
      }
      
      const updatedLead = { ...leadToUpdate, status };
      const updatedLeads = leads.map(lead => 
        lead.id === leadId ? updatedLead : lead
      );
      
      saveLeadsToLocalStorage(updatedLeads);
      
      return updatedLead; // Return the full updated lead object
    } catch {
      return rejectWithValue('Failed to update lead status. Please try again later.');
    }
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLead = action.payload;
        const index = state.items.findIndex(item => item.id === updatedLead.id);
        
        if (index !== -1) {
          state.items[index] = updatedLead;
        }
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leadsSlice.reducer;

export const selectLeads = (state: RootState) => state.leads.items;
export const selectLeadsLoading = (state: RootState) => state.leads.loading;
export const selectLeadsError = (state: RootState) => state.leads.error; 