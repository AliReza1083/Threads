import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// this function is for reusable components, e.g buttons
export function cn(...inputs: ClassValue[]): any {
  return twMerge(clsx(inputs));
}

export const isValidLink = (link: string) => {
  // Regular expression to match a URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  // Check if the input matches the URL regex
  return urlRegex.test(link);
};
