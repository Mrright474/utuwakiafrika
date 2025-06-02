
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';

const PaymentForm = () => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h4 className="font-medium flex items-center text-utu-black">
          <CreditCard className="mr-2 h-5 w-5 text-utu-red" />
          Airtel Money Global Pay (Mastercard)
        </h4>
        <p className="text-sm text-gray-600 mt-2">
          We exclusively accept donations through Airtel Money Global Pay Mastercard. Your donation 
          will be processed immediately and you'll receive a confirmation email.
        </p>
      </div>
      
      <div className="space-y-2">
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
  );
};

export default PaymentForm;
