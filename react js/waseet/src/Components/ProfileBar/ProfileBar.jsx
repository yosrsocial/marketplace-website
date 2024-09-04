import React from 'react'
import './ProfileBar.css'
import profilePicture from '../Assets/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
import api from '../api-requests'
import { useEffect } from 'react'

export const ProfileBar = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const response = await api.get('/sellers/');
          //console.log('response:', response)
          setData(response.data);
        } catch (error) {
          console.error(error); // Handle errors
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
