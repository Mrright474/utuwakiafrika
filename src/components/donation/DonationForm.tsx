
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import DonationAmountSelector from './DonationAmountSelector';
import PaymentForm from './PaymentForm';

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const { toast } = useToast();
  
  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const handleDonation = (e: React.FormEvent, paymentMethod: string, paymentData: any) => {
    e.preventDefault();
    
    const donationAmount = amount === 'custom' ? customAmount : amount;
    
    if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    // Handle different payment methods
    switch (paymentMethod) {
      case 'mobile':
        handleMobilePayment(donationAmount, paymentData);
        break;
      case 'card':
        handleCardPayment(donationAmount, paymentData);
        break;
      case 'bank':
        handleBankTransfer(donationAmount);
        break;
      default:
        toast({
          title: "Payment Method Required",
          description: "Please select a payment method.",
          variant: "destructive"
        });
    }
  };

  const handleMobilePayment = (amount: string, paymentData: any) => {
    const { provider, phoneNumber } = paymentData;
    
    if (provider === 'airtel') {
      // Trigger Airtel Money USSD
      const ussdCode = `*185*9*${amount}*0744552195#`;
      toast({
        title: "Airtel Money Payment",
        description: `Please dial ${ussdCode} to complete your donation of UGX ${amount}`,
      });
      // Try to open USSD dialer on mobile
      if (navigator.userAgent.match(/Android/i)) {
        window.location.href = `tel:${encodeURIComponent(ussdCode)}`;
      }
    } else if (provider === 'mtn') {
      // Trigger MTN Mobile Money USSD
      const ussdCode = `*165*3*${amount}*0778777976#`;
      toast({
        title: "MTN Mobile Money Payment", 
        description: `Please dial ${ussdCode} to complete your donation of UGX ${amount}`,
      });
      // Try to open USSD dialer on mobile
      if (navigator.userAgent.match(/Android/i)) {
        window.location.href = `tel:${encodeURIComponent(ussdCode)}`;
      }
    }
  };

  const handleCardPayment = (amount: string, paymentData: any) => {
    // For demo purposes - in production you'd integrate with Stripe/PayPal
    toast({
      title: "Redirecting to Payment Processor",
      description: `Processing your card payment of $${amount}. You'll be redirected to our secure payment partner.`,
    });
    
    // Simulate redirect to payment processor
    setTimeout(() => {
      // In production, redirect to actual payment processor
      window.open('https://checkout.stripe.com', '_blank');
    }, 2000);
  };

  const handleBankTransfer = (amount: string) => {
    toast({
      title: "Bank Transfer Details",
      description: `Bank: Stanbic Bank Uganda | Account: 9030123456789 | Amount: UGX ${amount}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Make a Secure Donation</CardTitle>
          <CardDescription>Support our mission with a secure donation using any major payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 py-4">
            <DonationAmountSelector
              amount={amount}
              customAmount={customAmount}
              onAmountSelect={handleAmountSelect}
              onCustomAmount={handleCustomAmount}
            />
            
            <PaymentForm 
              onPayment={(paymentMethod, paymentData) => 
                handleDonation(new Event('submit') as any, paymentMethod, paymentData)
              }
              donationAmount={amount === 'custom' ? customAmount : amount}
            />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-center text-muted-foreground">
            Your donation helps us make a difference in the lives of people across Africa.
            Thank you for your generosity.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <img 
              src="https://www.mastercard.com/content/dam/public/mastercardcom/na/global-site/images/logos/mc-logo-52.svg" 
              alt="Mastercard Logo" 
              className="h-6"
            />
            <img 
              src="https://brand.visa.com/content/dam/VCOM/Brand/logo/logo-h-sm.png" 
              alt="Visa Logo" 
              className="h-6"
            />
            <span className="text-xs text-muted-foreground">+ More payment methods</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DonationForm;
