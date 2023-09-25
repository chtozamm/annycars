import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: {
          label: "Пароль",
          type: "password",
          placeholder: "",
        },
      },
      async authorize(credentials, req) {
        // This is where you need to retrieve user data
        // to verify with credentials
        const user = {
          id: "1",
          password: process.env.AUTH_PASSWORD,
        };

        if (credentials?.password === user.password) {
          return user;
        } else {
          throw Error("Неверный пароль.");
        }
      },
    }),
  ],
};
