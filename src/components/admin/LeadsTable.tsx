'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchLeads, Lead, LeadStatus, updateLeadStatus } from '@/features/leads';
import { RootState, AppDispatch } from '@/store';
import { colors, borderRadius, spacing, typography } from '@/lib/theme';

const TableContainer = styled.div`
  background-color: white;
  font-family: ${typography.fontFamily.primary}, sans-serif;
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  overflow: hidden;
  margin-top: ${spacing.small};
`;

const SearchContainer = styled.div`
  display: flex;
  gap: ${spacing.small};
  margin-top: ${spacing.medium};
  margin-bottom: ${spacing.small};
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 16rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${spacing.small};
  color: ${colors.black20};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SearchInput = styled.input`
  flex: 1;
  width: 100%;
  background-color: ${colors.background};
  padding: ${spacing.small} ${spacing.medium};
  padding-left: ${spacing.medium};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.small};
  font-size: ${typography.fontSizes.small};
  font-family: ${typography.fontFamily.primary}, sans-serif;
  color: ${colors.black20};
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  
  &::placeholder {
    color: ${colors.black20};
  }
`;

const FilterButton = styled.button`
  background-color: ${colors.background};
  color: ${colors.black20};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.small};
  padding: ${spacing.small} ${spacing.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  
  &:hover {
    background-color: ${colors.grey2};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${colors.border};
  background-color: ${colors.background};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${spacing.small} ${spacing.base};
  font-weight: ${typography.fontWeights.medium};
  font-size: ${typography.fontSizes.small};
  color: ${colors.black20};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background-color: ${colors.grey3};
  }
  
  &:first-child {
    width: max-content;
  }
  
  &:nth-child(2) {
    width: max-content;
  }
  
  &:nth-child(3) {
    width: max-content;
  }
  
  &:nth-child(4) {
    width: max-content;
  }
`;

const SortIconWrapper = styled.span`
  margin-left: ${spacing.xsmall};
  display: inline-flex;
  align-items: center;
`;

const ArrowIcon = styled.span<{ active?: boolean; direction?: 'asc' | 'desc' }>`
  color: ${props => props.active ? colors.text.primary : colors.black60};
  font-size: ${typography.fontSizes.small};
  opacity: ${props => props.active ? 1 : 0.5};
  transform: ${props => props.direction === 'desc' ? 'none' : 'rotate(180deg)'};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.grey3};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${colors.cloud};
  }
`;

const TableCell = styled.td`
  padding: ${spacing.small} ${spacing.base};
  color: ${colors.text.primary};
  font-size: ${typography.fontSizes.small};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusBadge = styled.span<{ status: LeadStatus }>`
  display: inline-block;
  padding: ${spacing.xsmall} ${spacing.small};
  border-radius: ${borderRadius.small};
  font-size: ${typography.fontSizes.small};
  font-weight: ${typography.fontWeights.medium};
  background-color: ${props => 
    props.status === LeadStatus.PENDING ? colors.moss20 : colors.apple
  };
  color: ${props => 
    props.status === LeadStatus.PENDING ? colors.moss : colors.black
  };
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${spacing.small} ${spacing.medium};
  gap: ${spacing.small};
  font-size: ${typography.fontSizes.small};
  border-top: 1px solid ${colors.border};
  background-color: ${colors.background};
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: ${spacing.medium};
  height: ${spacing.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
  border: ${props => props.active ? `1px solid ${colors.black}` : `none`};
  color: ${colors.text.primary};
  font-size: ${typography.fontSizes.small};
  font-weight: ${props => props.active ? typography.fontWeights.bold : typography.fontWeights.normal};
  border-radius: ${borderRadius.xsmall};
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing.xsmall};
  color: ${colors.black};
  border-radius: ${borderRadius.small};
  margin-right: ${spacing.xsmall};
  
  &:hover {
    background-color: ${colors.grey2};
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const StatusButton = styled.button`
  background-color: ${colors.moss};
  color: white;
  border: none;
  border-radius: ${borderRadius.small};
  padding: ${spacing.xsmall} ${spacing.small};
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${colors.moss80};
  }
  
  &:disabled {
    background-color: ${colors.grey3};
    cursor: not-allowed;
  }
`;

// Add a styled container for the status column
const StatusCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xsmall};
`;

type SortField = 'name' | 'submitted' | 'status' | 'country' | 'email';
type SortDirection = 'asc' | 'desc';

export default function LeadsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const leadsState = useSelector((state: RootState) => 
    (state.leads || { items: [] }) as {
      items: Lead[];
      loading: boolean;
      error: string | null;
    }
  );
  const { items: leads = [] } = leadsState;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [sortField, setSortField] = useState<SortField>('submitted');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  useEffect(() => {
    // Initial fetch
    dispatch(fetchLeads());
    
    // Set up refresh interval (every 30 seconds)
    const refreshInterval = setInterval(() => {
      dispatch(fetchLeads());
    }, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(refreshInterval);
  }, [dispatch]);
  
  // Add a useEffect to show a message when using localStorage data
  useEffect(() => {
    if (leads.length > 0) {
      // Check if any leads have IDs starting with 'local-'
      const hasLocalLeads = leads.some(lead => 
        lead.id.startsWith('local-')
      );
      
      if (hasLocalLeads) {
        console.log('Displaying leads from localStorage');
      }
    }
  }, [leads]);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortIcon = (field: SortField) => {
    const isActive = sortField === field;
    
    return (
      <SortIconWrapper>
        <ArrowIcon 
          active={isActive ? true : undefined} 
          direction={sortDirection}
        >
          ↓
        </ArrowIcon>
      </SortIconWrapper>
    );
  };
  
  // Filter and sort leads
  const filteredLeads = leads.filter((lead) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.interestedVisas.some(visa => visa.toLowerCase().includes(searchLower));
    
    return (statusFilter === 'ALL' || lead.status === statusFilter) && matchesSearch;
  });

  // Extract country from the lead's additionalInfo
  const getCountryFromLead = (lead: Lead) => {
    if (lead.additionalInfo && lead.additionalInfo.includes('country:')) {
      const countryMatch = lead.additionalInfo.match(/country:\s*([^,\n]+)/);
      return countryMatch ? countryMatch[1].trim() : 'Not specified';
    }
    return 'Not specified';
  };
  
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        break;
      case 'email':
        comparison = a.email.localeCompare(b.email);
        break;
      case 'submitted':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'country':
        const countryA = getCountryFromLead(a);
        const countryB = getCountryFromLead(b);
        comparison = countryA.localeCompare(countryB);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Paginate leads
  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Format interested visas as a comma-separated list
  const formatVisaTypes = (visaTypes: string[]) => {
    return visaTypes.join(', ');
  };
  
  // Add function to handle status change
  const handleStatusChange = (leadId: string) => {
    dispatch(updateLeadStatus({
      leadId,
      status: LeadStatus.REACHED_OUT
    }));
  };
  
  return (
    <div>
      <SearchContainer>
        <SearchInputWrapper>
          <SearchIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
            </svg>
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputWrapper>
        <FilterButton onClick={() => setStatusFilter(statusFilter === 'ALL' ? LeadStatus.PENDING : 'ALL')}>
          Status {statusFilter !== 'ALL' ? `(${statusFilter})` : ''}
          <span>▼</span>
        </FilterButton>
      </SearchContainer>
      
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeader onClick={() => handleSort('name')}>
                Name {getSortIcon('name')}
              </TableHeader>
              <TableHeader onClick={() => handleSort('email')}>
                Email
              </TableHeader>
              <TableHeader>
                Visas
              </TableHeader>
              <TableHeader onClick={() => handleSort('submitted')}>
                Submitted {getSortIcon('submitted')}
              </TableHeader>
              <TableHeader onClick={() => handleSort('status')}>
                Status {getSortIcon('status')}
              </TableHeader>
              <TableHeader onClick={() => handleSort('country')}>
                Country {getSortIcon('country')}
              </TableHeader>
              <TableHeader>
                Actions
              </TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {paginatedLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{`${lead.firstName} ${lead.lastName}`}</TableCell>
                <TableCell>
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </TableCell>
                <TableCell>
                  {formatVisaTypes(lead.interestedVisas)}
                </TableCell>
                <TableCell>{formatDate(lead.createdAt)}</TableCell>
                <TableCell>
                  <StatusCell>
                    <StatusBadge status={lead.status}>
                      {lead.status === LeadStatus.PENDING ? 'Pending' : 'Reached Out'}
                    </StatusBadge>
                    {lead.status === LeadStatus.PENDING && (
                      <StatusButton 
                        onClick={() => handleStatusChange(lead.id)}
                        title="Mark as reached out"
                      >
                        Mark Reached Out
                      </StatusButton>
                    )}
                  </StatusCell>
                </TableCell>
                <TableCell>{getCountryFromLead(lead)}</TableCell>
                <TableCell>
                  <ActionButton>
                    <a href={lead.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </ActionButton>
                  {lead.resumeUrl && (
                    <ActionButton>
                      <a href={lead.resumeUrl} target="_blank" rel="noopener noreferrer">
                        Resume
                      </a>
                    </ActionButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        
        <Pagination>
          <PageButton 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            &lt;
          </PageButton>
          
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
            const pageNum = currentPage <= 2 
              ? i + 1 
              : currentPage >= totalPages - 1 
                ? totalPages - 2 + i 
                : currentPage - 1 + i;
                
            if (pageNum <= totalPages) {
              return (
                <PageButton 
                  key={pageNum}
                  active={currentPage === pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </PageButton>
              );
            }
            return null;
          })}
          
          <PageButton 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            &gt;
          </PageButton>
        </Pagination>
      </TableContainer>
    </div>
  );
} 