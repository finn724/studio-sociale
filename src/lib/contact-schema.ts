import { z } from "zod";

export const interests = [
  "Management",
  "Content",
  "Strategy",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  brand: z.string().trim().min(2, "Enter your brand or business name."),
  email: z.string().trim().email("Enter a valid email address."),
  handle: z.string().trim().optional().default(""),
  interests: z
    .array(z.enum(interests))
    .min(1, "Select at least one interest."),
  message: z.string().trim().min(10, "Tell us a little more about what you need."),
  company: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<ContactField, string>>;
