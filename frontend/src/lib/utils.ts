import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatToInternational(phone: string): string {
  // Remove all non-digit characters (optional, e.g., spaces or dashes)
  const cleaned = phone.replace(/\D/g, '');

  // Check if it starts with "0" and is 11 digits
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return '+234' + cleaned.slice(1);
  }

  // If it already starts with "234" and is 13 digits, just add '+'
  if (cleaned.length === 13 && cleaned.startsWith('234')) {
    return '+' + cleaned;
  }

  alert('Invalid Nigerian phone number format')
  // Otherwise return as-is or throw an error
  throw new Error('Invalid Nigerian phone number format');
}