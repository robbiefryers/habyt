import { EmploymentStatus, Gender, MonthlyIncome } from '@/consts';
import { z } from 'zod';
import { phone } from 'phone';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const bookingPersonalSchema = z.object({
  email: z.string().email(),
  phone: z.string().refine((val) => phone(val).isValid, { message: 'Please enter valid internation phone number' }),
  first_name: z.string().min(2, { message: 'Name must be at least 2 chars' }),
  last_name: z.string().min(2, { message: 'Name must be at least 2 chars' }),
  dob: z.string().refine((val) => dateRegex.test(val), { message: 'Invalid date' }),
  gender: z.nativeEnum(Gender, { errorMap: (issue) => ({ message: 'Please select your gender' }) }),
});

export const bookingFinancialSchema = z.object({
  national_id: z.string().min(6, { message: 'National Id must be at least 6 chars' }),
  nationality: z.string().min(2, { message: 'Please select your nationality' }),
  employment_status: z.nativeEnum(EmploymentStatus, { errorMap: (issue) => ({ message: 'Please select your employment status' }) }),
  monthly_income: z.nativeEnum(MonthlyIncome, { errorMap: (issue) => ({ message: 'Please select your monthly income' }) }),
  move_in: z.string().refine((val) => {
    if(!dateRegex.test(val)) return false
    const moveIn = new Date(val);
    const now = new Date();
    if(moveIn.getTime() < now.getTime()) return false
    return true
  }, { message: 'Please provide a valid move in date'}),
});


export const bookingConfirmSchema = z.object({
  accept_terms: z.boolean().refine((val) => val === true, { message: 'You must accept the terms' })
});



