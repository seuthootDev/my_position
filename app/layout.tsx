import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const figtree = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "월급 자랑 타임! 💰 내 소득 수준이 궁금하다면?",
  description: "내 월급은 상위 몇 퍼센트? 재미있는 소득 비교 테스트! 🎯",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>{children}</body>
    </html>
  )
}



import './globals.css'