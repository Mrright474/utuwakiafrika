
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DollarSign, CreditCard } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Donate = () => {
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
      description: `Your donation of $${donationAmount} is being processed via Airtel Money Card. You will receive a confirmation shortly.`,
    });
  };

  return (
    <Layout>
      <div className="bg-utu-light-gray py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-utu-black font-heading">Make a Donation</h1>
            <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
            <p className="text-lg text-utu-gray">
              Your generous contribution helps us continue our mission of providing 
              sustainable solutions and support to African communities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Donate with Airtel Money Card</CardTitle>
                <CardDescription>Make a secure donation using Airtel Money Global Pay Mastercard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonation} className="space-y-6 py-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Donation Amount</h3>
                    
                    <RadioGroup defaultValue={amount} onValueChange={handleAmountSelect} className="grid grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="10" id="card-amount-10" className="peer sr-only" />
                        <Label
                          htmlFor="card-amount-10"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                        >
                          <DollarSign className="mb-2 h-6 w-6" />
                          $10
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="25" id="card-amount-25" className="peer sr-only" />
                        <Label
                          htmlFor="card-amount-25"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                        >
                          <DollarSign className="mb-2 h-6 w-6" />
                          $25
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="50" id="card-amount-50" className="peer sr-only" />
                        <Label
                          htmlFor="card-amount-50"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                        >
                          <DollarSign className="mb-2 h-6 w-6" />
                          $50
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="100" id="card-amount-100" className="peer sr-only" />
                        <Label
                          htmlFor="card-amount-100"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                        >
                          <DollarSign className="mb-2 h-6 w-6" />
                          $100
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="250" id="card-amount-250" className="peer sr-only" />
                        <Label
                          htmlFor="card-amount-250"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                        >
                          <DollarSign className="mb-2 h-6 w-6" />
                          $250
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="custom" id="card-amount-custom" className="peer sr-only" />
                        <Label
                          htmlFor="card-amount-custom"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                        >
                          <DollarSign className="mb-2 h-6 w-6" />
                          Custom
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {amount === 'custom' && (
                      <div className="mt-4">
                        <Label htmlFor="card-custom-amount">Enter Custom Amount ($)</Label>
                        <Input 
                          id="card-custom-amount"
                          type="number" 
                          min="1" 
                          placeholder="Enter amount" 
                          value={customAmount}
                          onChange={handleCustomAmount}
                          className="mt-1"
                        />
                      </div>
                    )}
                    
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <h4 className="font-medium flex items-center text-utu-black">
                        <CreditCard className="mr-2 h-5 w-5 text-utu-red" />
                        Airtel Money Global Pay (Mastercard)
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        We exclusively accept donations through Airtel Money Global Pay Mastercard. Your donation 
                        will be processed immediately and you'll receive a confirmation email.
                      </p>
                    </div>
                    
                    <div className="space-y-2 mt-6">
                      <h3 className="text-lg font-medium">Card Details</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input id="card-name" placeholder="John Doe" required />
                        </div>
                        <div>
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-utu-red hover:bg-red-700 text-white">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Complete Donation via Airtel Money Mastercard
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="text-sm text-center text-muted-foreground">
                  Your donation helps us make a difference in the lives of people across Africa.
                  Thank you for your generosity.
                </p>
                <img 
                  src="https://www.mastercard.com/content/dam/public/mastercardcom/na/global-site/images/logos/mc-logo-52.svg" 
                  alt="Mastercard Logo" 
                  className="h-8 mt-2"
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
