import { z } from 'zod';

export const checkInSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  phone: z.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  partySize: z.number()
    .min(1, 'Party size must be at least 1')
    .max(12, 'Party size cannot exceed 12'),
});

export type CheckInFormData = z.infer<typeof checkInSchema>;

export const tableAssignmentSchema = z.object({
  tableId: z.string().min(1, 'Please select a table'),
  customerId: z.string().min(1, 'Customer ID is required'),
});

export type TableAssignmentFormData = z.infer<typeof tableAssignmentSchema>;