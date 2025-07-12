
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, Building } from 'lucide-react';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} className="grid grid-cols-1 gap-4">
          <div>
            <RadioGroupItem value="card" id="payment-card" className="peer sr-only" />
            <Label
              htmlFor="payment-card"
              className="flex items-center space-x-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red cursor-pointer"
            >
              <CreditCard className="h-5 w-5 text-utu-red" />
              <div>
                <div className="font-medium">Credit/Debit Card</div>
                <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
              </div>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem value="mobile" id="payment-mobile" className="peer sr-only" />
            <Label
              htmlFor="payment-mobile"
              className="flex items-center space-x-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red cursor-pointer"
            >
              <Smartphone className="h-5 w-5 text-utu-red" />
              <div>
                <div className="font-medium">Mobile Money</div>
                <div className="text-sm text-muted-foreground">Airtel Money, MTN MoMo, M-Pesa</div>
              </div>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem value="bank" id="payment-bank" className="peer sr-only" />
            <Label
              htmlFor="payment-bank"
              className="flex items-center space-x-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red cursor-pointer"
            >
              <Building className="h-5 w-5 text-utu-red" />
              <div>
                <div className="font-medium">Bank Transfer</div>
                <div className="text-sm text-muted-foreground">Direct bank transfer</div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <h4 className="font-medium">Card Details</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-name">Name on Card</Label>
              <Input id="card-name" placeholder="John Doe" required />
            </div>
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" required />
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
      )}

      {paymentMethod === 'mobile' && (
        <div className="space-y-4">
          <h4 className="font-medium">Mobile Money Payment Instructions</h4>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h5 className="font-medium text-blue-900 mb-2">Send payment to:</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm font-medium">Airtel Money:</span>
                  <span className="text-sm font-mono text-blue-800">0744552195</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm font-medium">MTN Mobile Money:</span>
                  <span className="text-sm font-mono text-blue-800">0778777976</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="mobile-provider">Select Your Provider</Label>
              <select id="mobile-provider" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="">Choose your mobile money provider</option>
                <option value="airtel">Airtel Money - Send to 0744552195</option>
                <option value="mtn">MTN Mobile Money - Send to 0778777976</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="mobile-number">Your Phone Number</Label>
              <Input id="mobile-number" placeholder="Enter your phone number" required />
            </div>
            
            <div>
              <Label htmlFor="transaction-ref">Transaction Reference (after payment)</Label>
              <Input id="transaction-ref" placeholder="Enter transaction ID after sending payment" />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="space-y-4">
          <h4 className="font-medium">Bank Transfer Details</h4>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              After clicking "Complete Donation", you'll receive bank transfer instructions via email. 
              Your donation will be confirmed once the transfer is received.
            </p>
          </div>
        </div>
      )}

      <div className="p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-800">
              <strong>Secure Payment:</strong> All transactions are encrypted and processed securely. 
              Your payment information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
