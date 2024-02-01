"use client"

import React from 'react'

export default function Button({
  text = 'Button'
}) {
  return (
    <div style={{backgroundColor:"black",}}>
        <h1 style={{color:'red'}}>{text}</h1>
    </div>
  )
}
