import { AuthOptions } from "next-auth"
import Discord from "next-auth/providers/discord"

export const auth: AuthOptions = {
    pages: {
        signIn: "/",
        signOut: "/",
        error: "/",
    },
    providers: [ Discord({
        clientId: process.env.AUTH_DISCORD_ID as string,
        clientSecret: process.env.AUTH_DISCORD_SECRET as string
    })],
    callbacks: {
        async jwt(params: any) {
            
            if (params?.user) {
                params.token.identifier = params.profile?.id as string
            }


            return params.token
        },

        async session(data: any) {
            
            let session = data.session

            if (session?.user) {
                session.user.identifier = data.token.identifier as string
            }

            return session
        }
    }
} 