import bcrypt from "bcryptjs";
import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FREE_CREDITS } from "@/constants/credits";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Invalid email or password");

        if (!user.active) {
          throw new Error("Account is blocked");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        if (!user.password) {
          throw new Error("Invalid password");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser && !dbUser.active) {
          throw new Error("Account is blocked");
        }

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              image: user.image ?? undefined,
              credits: FREE_CREDITS,
              totalRequests: 0,
              provider: "google",
              emailVerified: new Date(),
              active: true,
            },
          });
        }

        (user as any).id = dbUser.id;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as any).id;

        const dbUser = await prisma.user.findUnique({
          where: { id: (user as any).id },
          select: {
            provider: true,
            image: true,
            active: true,
          },
        });

        token.provider = dbUser?.provider;
        token.image = dbUser?.image;
        token.active = dbUser?.active;
      } 

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        (session.user as any).provider = token.provider;
        (session.user as any).active = token.active;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
};

export async function getAuthUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, active: true },
  });

  if (!dbUser) return null;
  return dbUser;
}
