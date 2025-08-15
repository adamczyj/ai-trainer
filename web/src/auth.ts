import NextAuth from "next-auth"
import Strava from "next-auth/providers/strava"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Strava({
      clientId: process.env.AUTH_STRAVA_ID!,
      clientSecret: process.env.AUTH_STRAVA_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(), // Convert numeric ID to string
          name: `${profile.firstname} ${profile.lastname}`,
          email: profile.email,
          image: profile.profile,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the user ID to the token
      if (user) {
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Add user ID from token to session
      if (session.user && token.userId) {
        session.user.id = token.userId as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
})

// Export prisma instance for use in other parts of the app
export { prisma }
