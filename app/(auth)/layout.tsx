import {ClerkProvider} from '@clerk/nextjs'
import {Inter} from 'next/font/google'
import React from "react";
import '../(root)/globals.css'
export const metadata = {
    title: "My Next App",
    description: "My Next.js application"
}

const inter = Inter({subsets:["latin"]})

export default function RootLayout ({children} : {children : React.ReactNode}) {
    return (
            <html lang='en'>
                <body className={`${inter.className} bg-dark-1`}>
                    {children}
                </body>
            </html>
    )
}