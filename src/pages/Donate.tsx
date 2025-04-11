
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, CreditCard, Smartphone, Building } from 'lucide-react';
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
      description: `Your donation of $${donationAmount} is being processed. You will receive a confirmation shortly.`,
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
                <CardTitle className="text-2xl">Select Donation Method</CardTitle>
                <CardDescription>Choose how you would like to donate</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mobileMoney" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="mobileMoney">Mobile Money</TabsTrigger>
                    <TabsTrigger value="bankTransfer">Bank Transfer</TabsTrigger>
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mobileMoney">
                    <form onSubmit={handleDonation} className="space-y-6 py-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Donation Amount</h3>
                        
                        <RadioGroup defaultValue={amount} onValueChange={handleAmountSelect} className="grid grid-cols-3 gap-4">
                          <div>
                            <RadioGroupItem value="10" id="amount-10" className="peer sr-only" />
                            <Label
                              htmlFor="amount-10"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                            >
                              <DollarSign className="mb-2 h-6 w-6" />
                              $10
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem value="25" id="amount-25" className="peer sr-only" />
                            <Label
                              htmlFor="amount-25"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                            >
                              <DollarSign className="mb-2 h-6 w-6" />
                              $25
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem value="50" id="amount-50" className="peer sr-only" />
                            <Label
                              htmlFor="amount-50"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                            >
                              <DollarSign className="mb-2 h-6 w-6" />
                              $50
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem value="100" id="amount-100" className="peer sr-only" />
                            <Label
                              htmlFor="amount-100"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                            >
                              <DollarSign className="mb-2 h-6 w-6" />
                              $100
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem value="250" id="amount-250" className="peer sr-only" />
                            <Label
                              htmlFor="amount-250"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                            >
                              <DollarSign className="mb-2 h-6 w-6" />
                              $250
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem value="custom" id="amount-custom" className="peer sr-only" />
                            <Label
                              htmlFor="amount-custom"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
                            >
                              <DollarSign className="mb-2 h-6 w-6" />
                              Custom
                            </Label>
                          </div>
                        </RadioGroup>
                        
                        {amount === 'custom' && (
                          <div className="mt-4">
                            <Label htmlFor="custom-amount">Enter Custom Amount ($)</Label>
                            <Input 
                              id="custom-amount"
                              type="number" 
                              min="1" 
                              placeholder="Enter amount" 
                              value={customAmount}
                              onChange={handleCustomAmount}
                              className="mt-1"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2 mt-6">
                          <h3 className="text-lg font-medium">Your Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" placeholder="John Doe" required />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" placeholder="john@example.com" required />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="phone">Mobile Money Number</Label>
                            <Input id="phone" placeholder="+256 XXXXXXXXX" required />
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-utu-red hover:bg-red-700 text-white">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Donate via Mobile Money
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="bankTransfer">
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Bank Transfer Details</h3>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span className="font-medium">Bank Name:</span>
                                <span>Equity Bank Uganda</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Account Name:</span>
                                <span>Utu Wa Kiafrika Charity Network</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Account Number:</span>
                                <span>1234567890</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">SWIFT Code:</span>
                                <span>EQBLUGKAXXX</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Branch:</span>
                                <span>Kampala Main Branch</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Reference:</span>
                                <span>Donation</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <p className="text-sm text-muted-foreground">
                          After making your bank transfer, please send your transaction details to 
                          utuwakiafrikacharitynetwork@gmail.com or contact us at +256 744 552 195 
                          for confirmation.
                        </p>
                      </div>
                      
                      <Button className="w-full bg-utu-red hover:bg-red-700 text-white">
                        <Building className="mr-2 h-4 w-4" />
                        I've Completed Bank Transfer
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="card">
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
                          
                          {/* Repeat for other amounts as in Mobile Money tab */}
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
                        Complete Donation
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="text-sm text-center text-muted-foreground">
                  Your donation helps us make a difference in the lives of people across Africa.
                  Thank you for your generosity.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
