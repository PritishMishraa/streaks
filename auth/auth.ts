import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import prisma from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: user.email ?? "",
                    },
                });

                if (existingUser) {
                    token.id = existingUser.id;
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email ?? "",
                            name: user.name,
                        },
                    });
                    token.id = newUser.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
})