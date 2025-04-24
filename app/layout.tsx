import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Agarwal Sweet Palace",
  description: "AI-powered scheduling dashboard for sweets production",
  icons: {
    icon: '/favicon.ico', 
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <header className="flex items-center gap-4 px-6 py-4 border-b">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h1 className="text-2xl font-bold">Agarwal Sweet Palace</h1>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'