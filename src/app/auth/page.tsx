import { redirect } from "next/navigation";

export default function AuthRedirectPage() {
  // Immediately redirect any request to /auth to the proper login page
  redirect("/login");
  return null; // This line will never be reached, but satisfies the function signature
}
