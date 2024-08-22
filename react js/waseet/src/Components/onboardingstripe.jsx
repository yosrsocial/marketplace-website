import React from 'react'
import './onboardingstripe.css'
import api from '../Components/api-requests.jsx'

export const Onboardingstripe=()=> {
    async function getAccountLink(stripeAccountId) {
        try {
            const response = api.post('/create-account-link/', {
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stripe_account_id: stripeAccountId }),
              })
          
          const { url } = await response.json();
          
          if (url) {
            window.location.href = url; // Redirect the user to the Stripe onboarding link
          } else {
            console.error('Failed to get the account link');
          }
        } catch (error) {
          console.error('Error fetching the account link:', error);
        }
      }
    return (
        <div className='onboard-button'>
            <button onClick={getAccountLink}>Onboarding</button>
        </div>
    )
}
