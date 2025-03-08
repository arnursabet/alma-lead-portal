'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createLead } from '../leadsSlice';
import FileUpload from '@/components/FileUpload';
import { AppDispatch } from '@/store';
import useForm, { ValidationRule, ValidationRules } from '@/hooks/useForm';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { colors, spacing, typography, borderRadius, padding } from '@/lib/theme';

// Full width container for the entire page
const PageContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: ${typography.fontFamily.primary};
`;

// Full width header section
const Header = styled.div`
  background-color: #d8e0a9;
  padding: ${spacing.xxlarge} 0;
  position: relative;
  width: 100%;
`;

// Content container to center content inside the header
const HeaderContent = styled.div`
  margin: 0 auto;
  padding: 0 ${spacing.large};
`;

const Logo = styled.div`
  font-size: ${typography.fontSizes.xxlarge};
  font-weight: ${typography.fontWeights.heavy};
  margin-bottom: ${spacing.large};
  color: ${colors.black};
  text-align: left;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: ${typography.fontSizes.headingHuge};
  font-weight: ${typography.fontWeights.heavy};
  margin-bottom: ${spacing.base};
  line-height: 1.2;
  color: ${colors.black};
  margin: 0 auto;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: ${typography.fontSizes.xxxlarge};
  }
`;

// Container for the form that maintains the 700px width
const ContentContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
`;

const FormContainer = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.large};
  border-radius: 0 0 ${borderRadius.base} ${borderRadius.base};
`;

const Section = styled.div`
  margin-bottom: ${spacing.xlarge};
  text-align: center;
`;

const SectionIcon = styled.div`
  margin-bottom: ${spacing.base};
  display: flex;
  justify-content: center;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #EAEEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black};
  border-radius: 8px;
`;

const FileIcon = styled(Icon)`
  background-color: #E8FFEA;
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSizes.xxlarge};
  font-weight: ${typography.fontWeights.bold};
  margin-bottom: ${spacing.small};
  color: ${colors.black};
`;

const SectionDescription = styled.p`
  color: ${colors.black};
  font-weight: ${typography.fontWeights.bold};
  margin-bottom: ${spacing.medium};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FormGroup = styled.div`
  margin: ${spacing.medium} auto;
  max-width: 450px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.small};
  margin: ${spacing.base} 0;
  justify-content: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 0.95rem;
  user-select: none;
  color: ${colors.black};
  margin-right: ${spacing.xsmall};
  transition: all 0.2s;
  border-radius: ${borderRadius.small};
  background-color: ${colors.grey2};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CustomCheckbox = styled.span`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${colors.white};
  border: 2px solid ${colors.grey3};
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  vertical-align: middle;
  transition: all 0.2s;

  ${HiddenCheckbox}:checked + & {
    background-color: ${colors.moss};
    border-color: ${colors.moss};
    
    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 5px;
      width: 5px;
      height: 10px;
      border: solid ${colors.white};
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${colors.moss20};
  }
`;

// Add a styled component for checkbox validation feedback
const CheckboxContainer = styled.div<{ $isValid?: boolean; $hasError?: boolean }>`
  position: relative;
  margin-bottom: ${spacing.medium};
  padding: ${spacing.base};
  border-radius: ${borderRadius.medium};
  transition: all 0.3s ease;
  background-color: ${({ $hasError, $isValid }) => 
    $hasError ? 'rgba(211, 47, 47, 0.05)' : 
    $isValid ? 'transparent' : 'transparent'};
  border: 1px solid ${({ $hasError, $isValid }) => 
    $hasError ? colors.error : 
    $isValid ? colors.success : 'transparent'};
`;

const SubmitButton = styled.button`
  background-color: ${colors.black};
  color: ${colors.white};
  padding: ${spacing.base};
  font-size: ${typography.fontSizes.large};
  font-weight: ${typography.fontWeights.bold};
  border-radius: ${borderRadius.small};
  width: 100%;
  max-width: 500px;
  cursor: pointer;
  border: none;
  margin-top: ${spacing.large};
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ThankYouContainer = styled.div`
  text-align: center;
  padding: ${padding.vertical} ${spacing.medium};
  background-color: ${colors.white};
  border-radius: ${borderRadius.base};
  margin: ${spacing.xlarge} auto;
  max-width: 600px;
`;

const ThankYouTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: ${spacing.base};
`;

// Define visa options directly instead of importing
const visaCategoryOptions = [
  { value: 'O1', label: 'O-1' },
  { value: 'EB1A', label: 'EB-1A' },
  { value: 'EB2NIW', label: 'EB-2 NIW' },
  { value: 'UNKNOWN', label: 'I don\'t know' }
];

interface ExtendedLeadFormData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  interestedVisas: string[];
  additionalInfo: string;
  country?: string;
}

// Define validation rules and types
type ValidationFunction = (values: ExtendedLeadFormData) => Record<string, string>;

// Convert our validation function to match expected ValidationRules type
const createValidationRules = (validationFn: ValidationFunction): ValidationRules<ExtendedLeadFormData> => {
  // Create a validation rule for each field in the form
  const fieldNames: (keyof ExtendedLeadFormData)[] = [
    'firstName', 'lastName', 'email', 'linkedin', 'interestedVisas', 'additionalInfo', 'country'
  ];
  
  const rules: Record<string, ValidationRule<ExtendedLeadFormData>> = {};
  
  // Add custom validation for each field
  fieldNames.forEach(field => {
    rules[field] = {
      custom: (value: unknown, formValues: ExtendedLeadFormData) => {
        const errors = validationFn(formValues);
        return !errors[field]; // Return true if no error for this field
      },
      errorMessage: 'Invalid value',
    };
  });
  
  return rules as ValidationRules<ExtendedLeadFormData>;
};

// Add these validation-related functions to the top of the file
const validateEmail = (email: string): boolean => {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const validateUrl = (url: string): boolean => {
  // Simple URL validation
  if (!url) return false;
  try {
    // Check if it's a valid URL or at least starts with http/https
    if (!/^(https?:\/\/|www\.)/i.test(url)) {
      url = 'https://' + url;
    }
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Update the form validation implementation
const formValidation: ValidationFunction = (formValues: ExtendedLeadFormData) => {
  const validationErrors: Record<string, string> = {};
  
  // First Name validation
  if (!formValues.firstName.trim()) {
    validationErrors.firstName = 'First name is required';
  } else if (formValues.firstName.trim().length < 2) {
    validationErrors.firstName = 'First name must be at least 2 characters';
  } else if (formValues.firstName.trim().length > 50) {
    validationErrors.firstName = 'First name must be less than 50 characters';
  }
  
  // Last Name validation
  if (!formValues.lastName.trim()) {
    validationErrors.lastName = 'Last name is required';
  } else if (formValues.lastName.trim().length < 2) {
    validationErrors.lastName = 'Last name must be at least 2 characters';
  } else if (formValues.lastName.trim().length > 50) {
    validationErrors.lastName = 'Last name must be less than 50 characters';
  }
  
  // Email validation
  if (!formValues.email) {
    validationErrors.email = 'Email is required';
  } else if (!validateEmail(formValues.email)) {
    validationErrors.email = 'Please enter a valid email address';
  }
  
  // LinkedIn/Website validation
  if (!formValues.linkedin) {
    validationErrors.linkedin = 'LinkedIn profile or website is required';
  } else if (!validateUrl(formValues.linkedin)) {
    validationErrors.linkedin = 'Please enter a valid URL';
  }
  
  // Country validation is optional, but if provided, validate
  if (formValues.country && formValues.country.trim().length < 2) {
    validationErrors.country = 'Country name must be at least 2 characters';
  }
  
  // Visa types validation
  if (!formValues.interestedVisas || formValues.interestedVisas.length === 0) {
    validationErrors.interestedVisas = 'Please select at least one visa type';
  }
  
  // Additional info is optional but limit the length
  if (formValues.additionalInfo && formValues.additionalInfo.length > 1000) {
    validationErrors.additionalInfo = 'Additional information must be less than 1000 characters';
  }
  
  return validationErrors;
};

// Add more styled components
const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.8rem;
  margin-top: ${spacing.small};
  text-align: left;
  max-width: 500px;
  margin: 8px auto;
  animation: fadeIn 0.3s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default function LeadForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  // Form handling with validation
  const { values, errors, handleChange, handleSubmit, setFieldError } = useForm<ExtendedLeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: '',
    interestedVisas: [],
    additionalInfo: '',
    country: ''
  }, createValidationRules(formValidation));
  
  // Mark field as touched when it loses focus
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur for better user experience
    const fieldValue = values[name as keyof ExtendedLeadFormData];
    const fieldErrors = formValidation({
      ...values,
      [name]: fieldValue
    });
    
    if (fieldErrors[name]) {
      setFieldError(name as keyof ExtendedLeadFormData, fieldErrors[name]);
    }
  };
  
  // Custom handle change to mark fields as touched when changed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!touchedFields[name]) {
      setTouchedFields(prev => ({ ...prev, [name]: true }));
    }
    
    handleChange(e);
    
    // Real-time validation for fields
    // Email and LinkedIn are validated immediately for better UX
    if (['email', 'linkedin', 'firstName', 'lastName'].includes(name)) {
      // Only validate important fields in real-time
      // This creates better UX by giving immediate feedback
      const fieldErrors = formValidation({
        ...values,
        [name]: value
      });
      
      if (fieldErrors[name]) {
        setFieldError(name as keyof ExtendedLeadFormData, fieldErrors[name]);
      } else {
        setFieldError(name as keyof ExtendedLeadFormData, '');
      }
    }
  };
  
  const handleFileChange = (file: File | null) => {
    setResumeFile(file);
    // Validate file size
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setFieldError('resumeFile', 'File size must be less than 5MB');
    } else if (file && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setFieldError('resumeFile', 'File must be a PDF or Word document');
    } else {
      // Clear any existing error
      setFieldError('resumeFile', '');
    }
  };
  
  const handleCheckboxChange = (visa: string) => {
    // Mark visa field as touched
    if (!touchedFields.interestedVisas) {
      setTouchedFields(prev => ({ ...prev, interestedVisas: true }));
    }
    
    const currentVisas = [...values.interestedVisas];
    const index = currentVisas.indexOf(visa);
    
    if (index === -1) {
      // Add visa if not already selected
      currentVisas.push(visa);
    } else {
      // Remove visa if already selected
      currentVisas.splice(index, 1);
    }
    
    // Update the form with new visas array
    handleChange({
      target: {
        name: 'interestedVisas',
        value: currentVisas,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
    
    // Validate checkboxes immediately
    const fieldErrors = formValidation({
      ...values,
      interestedVisas: currentVisas
    });
    
    if (fieldErrors.interestedVisas) {
      setFieldError('interestedVisas', fieldErrors.interestedVisas);
    } else {
      setFieldError('interestedVisas', '');
    }
  };
  
  // Only show error if field was touched and has error
  const shouldShowError = (fieldName: string): string | undefined => {
    return touchedFields[fieldName] && errors[fieldName] ? errors[fieldName] : undefined;
  };
  
  // Check if field has been validated successfully
  const isFieldValid = (fieldName: string): boolean => {
    return touchedFields[fieldName] && !errors[fieldName];
  };
  
  const onSubmit = async (formValues: ExtendedLeadFormData) => {
    try {
      // Mark all fields as touched
      const allFields = Object.keys(formValues);
      const allTouched = allFields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouchedFields(allTouched);
      
      // Run validation
      const validationErrors = formValidation(formValues);
      
      // If there are validation errors, scroll to the first error
      if (Object.keys(validationErrors).length > 0) {
        // Set a small timeout to allow errors to be rendered
        setTimeout(() => {
          // Find first error element
          const firstErrorField = Object.keys(validationErrors)[0];
          const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
          
          if (errorElement) {
            // Scroll to the error with smooth behavior
            errorElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
            
            // Focus the element for accessibility
            (errorElement as HTMLElement).focus();
          }
        }, 100);
        
        return;
      }
      
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Create FormData for API call
      const formData = new FormData();
      formData.append('firstName', formValues.firstName);
      formData.append('lastName', formValues.lastName);
      formData.append('email', formValues.email);
      formData.append('linkedin', formValues.linkedin);
      formData.append('interestedVisas', JSON.stringify(formValues.interestedVisas));
      formData.append('additionalInfo', formValues.additionalInfo || '');
      if (formValues.country) {
        formData.append('country', formValues.country);
      }
      
      if (resumeFile) {
        formData.append('resumeFile', resumeFile);
      }
      
      console.log('Submitting form data:', Object.fromEntries(formData.entries()));
      
      // Dispatch the action to create a lead
      const result = await dispatch(createLead(formData)).unwrap();
      console.log('Lead created successfully:', result);
      
      // Success!
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitSuccess) {
    return (
      <PageContainer>
        <ContentContainer>
          <ThankYouContainer>
            <SectionIcon>
              <Icon>😊</Icon>
            </SectionIcon>
            <ThankYouTitle>Thank You</ThankYouTitle>
            <SectionDescription>Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai</SectionDescription>
            <Button 
              onClick={() => window.location.reload()}
              style={{ marginTop: spacing.medium, padding: spacing.base, minWidth: '350px', backgroundColor: colors.black, color: colors.white }}
            >
              Go Back to Homepage
            </Button>
          </ThankYouContainer>
        </ContentContainer>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Logo>Logo</Logo>
          <Title>Get An Assessment Of Your Immigration Case</Title>
        </HeaderContent>
      </Header>
      
      <ContentContainer>
        <FormContainer>
          <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Visa assessment form">
            <Section>
              <SectionIcon>
                <Icon>📄</Icon>
              </SectionIcon>
              <SectionTitle>Want to understand your visa options?</SectionTitle>
              <SectionDescription>
                Submit the form below and our team of experienced attorneys will
                review your information and send a preliminary assessment of your
                case based on your goals.
              </SectionDescription>
              
              <FormGroup>
                <Input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  error={shouldShowError('firstName')}
                  isValid={isFieldValid('firstName')}
                  aria-required="true"
                />
              </FormGroup>
              
              <FormGroup>
                <Input
                  name="lastName"
                  value={values.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  error={shouldShowError('lastName')}
                  isValid={isFieldValid('lastName')}
                  aria-required="true"
                />
              </FormGroup>
              
              <FormGroup>
                <Input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  error={shouldShowError('email')}
                  isValid={isFieldValid('email')}
                  helperText=""
                  aria-required="true"
                />
              </FormGroup>
              
              <FormGroup>
                <Input
                  name="country"
                  value={values.country as string}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Country of Citizenship"
                  error={shouldShowError('country')}
                  isValid={isFieldValid('country')}
                />
              </FormGroup>
              
              <FormGroup>
                <Input
                  name="linkedin"
                  value={values.linkedin}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="LinkedIn profile or website"
                  error={shouldShowError('linkedin')}
                  isValid={isFieldValid('linkedin')}
                  helperText="Please enter a valid URL with http:// or https://"
                  aria-required="true"
                />
              </FormGroup>
            </Section>
            
            <Section>
              <SectionIcon>
                <FileIcon>📎</FileIcon>
              </SectionIcon>
              <SectionTitle>Upload your resume</SectionTitle>
              <SectionDescription>
                Share your resume to help us better understand your experience and qualifications
              </SectionDescription>
              
              <FormGroup>
                <FileUpload onFileChange={handleFileChange} />
                {errors.resumeFile && (
                  <ErrorMessage role="alert">
                    {errors.resumeFile}
                  </ErrorMessage>
                )}
              </FormGroup>
            </Section>
            
            <Section>
              <SectionIcon>
                <Icon>🔍</Icon>
              </SectionIcon>
              <SectionTitle>Visa categories of interest?</SectionTitle>
                
                <CheckboxContainer 
                  $isValid={isFieldValid('interestedVisas')} 
                  $hasError={!!shouldShowError('interestedVisas')}
                >
                  <CheckboxGroup>
                    {visaCategoryOptions.map(option => (
                      <CheckboxLabel key={option.value}>
                        <HiddenCheckbox
                          checked={values.interestedVisas.includes(option.value)}
                          onChange={() => handleCheckboxChange(option.value)}
                          aria-label={option.label}
                        />
                        <CustomCheckbox />
                        {option.label}
                      </CheckboxLabel>
                    ))}
                  </CheckboxGroup>
                  
                  {shouldShowError('interestedVisas') && (
                    <ErrorMessage role="alert">
                      {errors.interestedVisas}
                    </ErrorMessage>
                  )}
                </CheckboxContainer>
            </Section>
            
            <Section>
              <SectionIcon>
                <Icon>❤️</Icon>
              </SectionIcon>
              <SectionTitle>How can we help you?</SectionTitle>
              
              <FormGroup>
                <Input
                  name="additionalInfo"
                  value={values.additionalInfo}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
                  as="textarea"
                  rows={5}
                  error={shouldShowError('additionalInfo')}
                  isValid={isFieldValid('additionalInfo')}
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                aria-busy={isSubmitting ? 'true' : 'false'}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </SubmitButton>
              
              {submitError && (
                <ErrorMessage role="alert">
                  {submitError}
                </ErrorMessage>
              )}
            </Section>
          </form>
        </FormContainer>
      </ContentContainer>
    </PageContainer>
  );
} 