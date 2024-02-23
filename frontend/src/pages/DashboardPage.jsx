import DialogForm from '@/components/dashboard/DialogForm'
import Posts from '@/components/dashboard/Posts'
import React from 'react'

function DashboardPage() {
  return (
    <div className='container mx-auto'>
      <div className='p-4'>
      <Posts/>
      </div>
     
    </div>
  )
}

export default DashboardPage