import React from 'react'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="flex justify-between h-[5vh] rounded-md mt-2">
            <h1 className="text-4xl">SAMPLE</h1>
            <Link href="/sign-in" className={buttonVariants({ variant: "secondary" })}>Sign In</Link>
        </div>
    )
}

export default Navbar