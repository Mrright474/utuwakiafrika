
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';

interface DonationAmountSelectorProps {
  amount: string;
  customAmount: string;
  onAmountSelect: (value: string) => void;
  onCustomAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DonationAmountSelector = ({ 
  amount, 
  customAmount, 
  onAmountSelect, 
  onCustomAmount 
}: DonationAmountSelectorProps) => {
  const presetAmounts = ['10', '25', '50', '100', '250'];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Donation Amount</h3>
      
      <RadioGroup defaultValue={amount} onValueChange={onAmountSelect} className="grid grid-cols-3 gap-4">
        {presetAmounts.map((presetAmount) => (
          <div key={presetAmount}>
            <RadioGroupItem value={presetAmount} id={`card-amount-${presetAmount}`} className="peer sr-only" />
            <Label
              htmlFor={`card-amount-${presetAmount}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-utu-red [&:has([data-state=checked])]:border-utu-red"
            >
              <DollarSign className="mb-2 h-6 w-6" />
              ${presetAmount}
            </Label>
          </div>
        ))}
        
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
            onChange={onCustomAmount}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default DonationAmountSelector;
