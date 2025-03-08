import { VisaType } from '@/features/leads/types';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

export const leadFormSchema: JsonSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 1,
    },
    lastName: {
      type: 'string',
      minLength: 1,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    linkedin: {
      type: 'string',
      pattern: '^(https?://)?(www\\.)?linkedin\\.com/.*$',
    },
    interestedVisas: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['H1B', 'L1', 'O1', 'EB2'],
      },
      uniqueItems: true,
    },
    additionalInfo: {
      type: 'string',
    },
  },
  required: ['firstName', 'lastName', 'email', 'linkedin', 'interestedVisas'],
};

export const leadFormUISchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstName',
      label: 'First Name',
    },
    {
      type: 'Control',
      scope: '#/properties/lastName',
      label: 'Last Name',
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      label: 'Email',
    },
    {
      type: 'Control',
      scope: '#/properties/linkedin',
      label: 'LinkedIn Profile URL',
    },
    {
      type: 'Control',
      scope: '#/properties/interestedVisas',
      label: 'Visas You Are Interested In',
      options: {
        format: 'checkbox',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/additionalInfo',
      label: 'Additional Information',
      options: {
        multi: true,
        rows: 5,
      },
    },
  ]
} as UISchemaElement;

export const visaOptions = [
  { label: 'H1B Visa', value: 'H1B' as VisaType },
  { label: 'L1 Visa', value: 'L1' as VisaType },
  { label: 'O1 Visa', value: 'O1' as VisaType },
  { label: 'EB2 Visa', value: 'EB2' as VisaType },
]; 