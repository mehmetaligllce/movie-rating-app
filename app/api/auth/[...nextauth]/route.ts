import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter"

export const authOptions: AuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session?.user && user?.id) {
                // @ts-ignore
                session.user.id = user.id;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };