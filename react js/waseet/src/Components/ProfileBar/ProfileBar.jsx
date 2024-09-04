import React from 'react'
import './ProfileBar.css'
import profilePicture from '../Assets/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'

export const ProfileBar = () => {
  return (
<div className='profilebar'>
  <div className="user">
    <div className="user-info">
    <div className="profile-picture">
    <img src={profilePicture} alt="" />
    </div>
    <div className="username">
      <h1>User</h1>
    </div>
    </div>
    <hr />
    <div className="balance">
      <h1>Balance</h1>
      <p>0.00</p>
    </div>
    <hr />
    <div className="order-tracking">
      <h1>My Orders</h1>
    </div>
    <hr />
  </div>
</div>
  )
}
