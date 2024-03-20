import React from 'react'
import dynamic from 'next/dynamic'

const NavBar = dynamic(() => import('@/components/NavBar'), {
    ssr: false
})
function EventMonitor() {
    return (
        <>
            <NavBar />

        </>
    )
}

export default EventMonitor