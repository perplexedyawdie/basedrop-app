import NavBar from '@/components/NavBar'
import axios from 'axios'
import React from 'react'

function baseboard() {
  async function sanityCheck(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const resp = await axios.get("/api/list-boards");
    console.log("sanity check")
    console.log(resp.data)
  }

  return (
    <>
      <NavBar />
      <button className="btn" onClick={sanityCheck}>Check</button>
    </>
  )
}

export default baseboard