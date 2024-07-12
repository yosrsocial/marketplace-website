import React from 'react'
import './ProfileBar.css'
import profilePicture from '../Assets/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'

export const ProfileBar = () => {
  return (
<div className='profilebar'>
  <div className="user">
    <div className="profile-picture">
    <img src={profilePicture} alt="" />
    </div>
    <div className="username">
      <h1>User</h1>
    </div>
  </div>
</div>
  )
}
