"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {children}
            <Toaster richColors position="top-right" />
        </SessionProvider>
    )
}

export default Providers