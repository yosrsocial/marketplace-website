import React from 'react'
import './ProfileBar.css'
import profilePicture from '../Assets/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
import api from '../api-requests'
import { useEffect,  useState } from 'react'
import {useParams} from 'react-router-dom';

export const ProfileBar = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const response = await api.get('/sellers/');
          console.log('response:', response)
          setData(response.data);
          setProfile(data.find((p) => p.id === +id))
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
<div>
    {loading ? (
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
      ) : (
        <div className="user">
          {/* Check if data isn't null*/}
          {data ? (
            <p>data available</p>
          ):(
            <div className="userpic">
              <div className="profile-picture">
                <img src={profilePicture} alt="profile picture" />
              </div>
              <div className="username">
                <h1>User</h1>
              </div>
              <hr />
              <div className="balance">
                <h1>Balance</h1>
                <p>0.00</p>
              </div>
              <hr />
            </div>
          )}
        </div>
      )}
      </div>
</div>
  )
}
