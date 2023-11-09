import React, { useEffect } from 'react'
import Tables from './Table'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()


  useEffect(() => {
    if(!localStorage.getItem('user')){
        navigate('/login')
    }
    } , [])

  return (
    <Tables/>
  )
}

export default Dashboard