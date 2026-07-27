import type { Metadata } from 'next'
import { Syne, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import PlausibleProvider from 'next-plausible'

const display = Syne({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['600', '700', '800']
})

const sans = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['400', '500', '600', '700']
})

const APP_NAME = 'CodeTidyup'
const APP_URL = 'https://codetidyup.com'
const APP_DESCRIPTION = 'Format and share beautiful images of your code.'
const APP_KEYWORDS = ['code', 'tidy', 'format', 'image', 'share', 'beautiful', 'code', 'images', 'code images']
const APP_DOMAIN = 'codetidyup.com'
const TWITTER_HANDLE = '@jackstevensdev'

export const metadata: Metadata = {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    keywords: APP_KEYWORDS || [APP_NAME],
    applicationName: APP_NAME,
    metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : `https://${APP_DOMAIN}/`),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: APP_URL,
        siteName: APP_NAME,
        title: APP_NAME,
        description: APP_DESCRIPTION,
        images: [
            {
                url: `${APP_URL}/opengraph-image.png`,
                width: 1200,
                height: 630,
                alt: APP_NAME
            }
        ]
    },
    twitter: {
        title: APP_NAME,
        description: APP_DESCRIPTION,
        creator: TWITTER_HANDLE
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <head>
                <PlausibleProvider
                    domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN as string}
                    trackLocalhost={true}
                    taggedEvents={true}
                    enabled={true}
                />
            </head>
            <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>{children}</body>
        </html>
    )
}
