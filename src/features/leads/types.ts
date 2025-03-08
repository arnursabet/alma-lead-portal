export type VisaType = 'H1B' | 'L1' | 'O1' | 'EB2';

export enum LeadStatus {
  PENDING = 'PENDING',
  REACHED_OUT = 'REACHED_OUT'
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  interestedVisas: VisaType[];
  resumeFile?: File | null;
  resumeUrl?: string;
  additionalInfo: string;
  status: LeadStatus;
  createdAt: string;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  interestedVisas: VisaType[];
  resumeFile?: File | null;
  additionalInfo: string;
} 