import { z } from "zod";

export const creditFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),
  helpType: z.enum([
    "Credit Repair",
    "Understanding My Credit",
    "Credit Improvement Guidance",
    "Other",
  ], {
    required_error: "Please select what you'd like help with",
  }),
  situation: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to allow AAA CREDIT REPAIRS to contact you regarding your request.",
  }),
});

export type CreditFormData = z.infer<typeof creditFormSchema>;

export const loanFormSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),
  loanType: z.string().min(1, "Please select a loan type"),
  desiredAmount: z.string().trim().min(1, "Desired loan amount is required"),
  employmentStatus: z.string().min(1, "Please select employment status"),
  monthlyIncome: z.string().trim().min(1, "Monthly income is required"),
  state: z.string().trim().min(1, "State/Region is required"),
  message: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to allow AAA CREDIT REPAIRS to review your request.",
  }),
});

export type LoanFormData = z.infer<typeof loanFormSchema>;
