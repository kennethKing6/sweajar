"use client"

import React from 'react'
import Button from '@mui/material/Button'

export default function ReportButton({
  onPress = ()=>{}
}) {
  return (
    <Button variant="outlined" onClick={onPress}>Report</Button>
  )
}
