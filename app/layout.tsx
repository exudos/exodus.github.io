import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavComponent } from "@/components/nav";
import Provider from "@/components/providers/auth";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hero Roleplay",
  description: "Hero roleplay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(auth);

  return (
    <html lang="en">
      <body className={`overflow-x-hidden ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Provider session={session}>
              <NavComponent/>
              {children}
            </Provider>
          </ThemeProvider>
      </body>
    </html>
  );
}
