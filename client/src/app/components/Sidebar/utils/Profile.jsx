import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const userDetails = useSelector(state => state.userAuth.userDetails);
        
  return (
    <div>
    </div>
  )
}

export default Profile