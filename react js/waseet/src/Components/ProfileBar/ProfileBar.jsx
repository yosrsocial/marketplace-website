import React from 'react'
import profilePicture from '../Assets/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'

export const ProfileBar = () => {
  return (
<div className='profilebar'>
  <div className="user">
    <div className="username">
      User
    </div>
    <div className="profile-picture">
    {profilePicture}
    </div>
  </div>
  <div className="Payments">
    <div className="balance"></div>
    
  </div>
</div>
  )
}
