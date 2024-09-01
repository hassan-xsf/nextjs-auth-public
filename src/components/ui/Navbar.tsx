import React from 'react'
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <div className = "flex justify-between h-[5vh] rounded-md mt-2">
            <h1 className = "text-4xl">SAMPLE</h1>
            <Button>Sign In</Button>
        </div>
    )
}

export default Navbar