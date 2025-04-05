import React from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

const Delete = () => {
  return (
    <Button className='bg-red-500 text-white hover:bg-red-600' >
        <Trash className='h-4 w-4'/>
    </Button>
  )
}

export default Delete