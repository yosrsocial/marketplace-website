import React from "react";
import { ConnectAccountOnboarding, ConnectComponentsProvider } from "@stripe/react-connect-js";

export const OnboardingUI = () => {

  const handleOnboardingSuccess = async (stripeAccountId) => {
    console.log("Onboarding completed with Stripe Account ID:", stripeAccountId);

    try {
      const response = await fetch('/save-stripe-account-id/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(), // If using Django or another framework that requires CSRF tokens
        },
        body: JSON.stringify({ stripe_account_id: stripeAccountId }),
      });

      if (response.ok) {
        console.log("Stripe Account ID saved successfully.");
      } else {
        console.error("Failed to save Stripe Account ID.");
      }
    } catch (error) {
      console.error("Error saving Stripe Account ID:", error);
    }
  };

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectAccountOnboarding
          onSuccess={handleOnboardingSuccess}
          onExit={() => {
            console.log("The account has exited onboarding");
          }}
          // Optional: make sure to follow our policy instructions above
          // fullTermsOfServiceUrl="{{URL}}"
          // recipientTermsOfServiceUrl="{{URL}}"
          // privacyPolicyUrl="{{URL}}"
          // skipTermsOfServiceCollection={false}
          // collectionOptions={{
          //   fields: 'eventually_due',
          //   futureRequirements: 'include',
          // }}
        />
    </ConnectComponentsProvider>
  );
}
