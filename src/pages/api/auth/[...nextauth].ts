import NextAuth from "next-auth";
import { authOptions } from "angela/server/auth";

export default NextAuth(authOptions);
