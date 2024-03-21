import React from 'react'
import dynamic from 'next/dynamic'
const BaseSpace = dynamic(() => import('@/components/BaseSpace'), {
  ssr: false
})
function baseboard() {
  return (
    <BaseSpace />
  )
}

export default baseboard