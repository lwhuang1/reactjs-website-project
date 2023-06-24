import { useState } from "react";
import { Button } from "primereact/button";
import { useStripe, useElements, PaymentElement, CardElement } from "@stripe/react-stripe-js";


export default function CheckoutForm() {
  const stripe = useStripe() // hook #1, gives us access to a resolved stripe object, which we passed through using the stripePromise and the Elements
  const elements = useElements() // hook #2, gives us access to an elements instance, which allows us to safely pass information from the PaymentElement to the StripeAPI

  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occured.")
    }

    setIsProcessing(false)
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
      <div className="payment-element" style={{ display: 'block', width: '100%' }}>
        <PaymentElement id="payment-element" />
      </div>
      <Button disabled={isProcessing || !stripe || !elements} id="submit" style={{ width: "50%", justifyContent: "center" }}>
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay Now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}