import React from 'react'
import DBleft from '../Components/DBleft'
import DBright from '../Components/DBright'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen flex bg-primary'>
        <DBleft />
        <DBright/>
    </div>
  )
}

export default Dashboard