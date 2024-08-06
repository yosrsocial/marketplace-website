import React from 'react';
import { New } from '../Components/New/New.jsx'
import { ProfileBar } from '../Components/ProfileBar/ProfileBar.jsx';
export const Home = () => {
  return (
    <div className='content-wrap'>
      <ProfileBar/>
      <New/>
    </div>
  )
}
