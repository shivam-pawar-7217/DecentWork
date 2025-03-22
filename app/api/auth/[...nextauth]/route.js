import { NEXT_AUTH } from "@/lib/auth";
import NextAuth from "next-auth";

const authHandler = NextAuth(NEXT_AUTH);

export { authHandler as GET, authHandler as POST };