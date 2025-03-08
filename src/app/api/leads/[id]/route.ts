import { NextRequest, NextResponse } from 'next/server';
import { LeadStatus } from '@/features/leads/types';
import { leads } from '../route';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const authToken = request.cookies.get('auth_token');
  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  const lead = leads.find(lead => lead.id === id);
  
  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }
  
  return NextResponse.json(lead);
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  const authToken = request.cookies.get('auth_token');
  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    
    const leadIndex = leads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    if (typeof body.status === 'string' && Object.values(LeadStatus).includes(body.status)) {
      leads[leadIndex] = {
        ...leads[leadIndex],
        status: body.status,
      };
      
      return NextResponse.json(leads[leadIndex]);
    } else {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }
  } catch {
    console.error('Error updating lead');
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
} 