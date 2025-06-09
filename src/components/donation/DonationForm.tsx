
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

  const handleDonation = (e: React.FormEvent) => {
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
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation of $${donationAmount} is being processed. You will receive a confirmation shortly.`,
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
          <form onSubmit={handleDonation} className="space-y-6 py-4">
            <DonationAmountSelector
              amount={amount}
              customAmount={customAmount}
              onAmountSelect={handleAmountSelect}
              onCustomAmount={handleCustomAmount}
            />
            
            <PaymentForm />
            
            <Button type="submit" className="w-full bg-utu-red hover:bg-red-700 text-white">
              <CreditCard className="mr-2 h-4 w-4" />
              Complete Secure Donation
            </Button>
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
