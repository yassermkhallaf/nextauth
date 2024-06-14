import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        const user = {
          id: 42,
          name: "yasser",
          email: "test@gmail.com",
          password: "nextauth",
          image: "image",
        };
        if (
          credentials.username === user.name &&
          credentials.password === user.password
        ) {
          console.log("user", user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.email = user.email; // Add email to the token
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.username = token.name;
      session.user.email = token.email; // Add email to the session
      session.user.image = token.image;
      console.log(session);
      return session;
    },
  },
};
