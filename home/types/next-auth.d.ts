import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      email: string
      name: string
      image: string
      identifier: string
    }
  }

  interface User {
    email: string
    name: string
    image: string
    identifier: string
  }

  interface AdapterUser {
    email: string
    name: string
    image: string
    identifier: string
  }
}