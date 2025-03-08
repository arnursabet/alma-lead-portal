import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Lead, LeadStatus, VisaType } from '@/features/leads/types';

export const leads: Lead[] = [];

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');
  
  if (request.nextUrl.searchParams.has('admin') && !authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();
    const email = formData.get('email')?.toString();
    const linkedin = formData.get('linkedin')?.toString();
    const interestedVisas = JSON.parse(formData.get('interestedVisas')?.toString() || '[]');
    const resumeFile = formData.get('resumeFile') as File | null;
    const additionalInfo = formData.get('additionalInfo')?.toString() || '';
    const country = formData.get('country')?.toString();
    
    if (!firstName || !lastName || !email || !linkedin || !interestedVisas || interestedVisas.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    let resumeUrl = '';
    if (resumeFile) {
      // In a real app, upload this to cloud storage
      resumeUrl = `https://storage.example.com/resumes/${firstName.toLowerCase()}-${lastName.toLowerCase()}-resume.pdf`;
    }
    
    const id = uuidv4();
    
    const newLead: Lead = {
      id,
      firstName,
      lastName,
      email,
      linkedin,
      interestedVisas: interestedVisas as VisaType[],
      resumeUrl,
      additionalInfo: additionalInfo + (country ? `\ncountry: ${country}` : ''),
      status: LeadStatus.PENDING,
      createdAt: new Date().toISOString(),
    };
    
    leads.push(newLead);
    
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
} 