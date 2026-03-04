import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Heart, DollarSign, Phone, CreditCard, Building2, CheckCircle } from 'lucide-react';

interface ProjectInvestmentFormProps {
  projectTitle: string;
  gradient: string;
  investmentOptions?: { title: string; amount: string }[];
}

const presetAmounts = ['50', '100', '250', '500', '1000', '5000'];

const ProjectInvestmentForm = ({ projectTitle, gradient, investmentOptions }: ProjectInvestmentFormProps) => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedInvestment, setSelectedInvestment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'card' | 'bank' | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const effectiveAmount = amount === 'custom' ? customAmount : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || Number(effectiveAmount) <= 0) {
      toast({ title: "Please select or enter an amount", variant: "destructive" });
      return;
    }
    if (!name || !email) {
      toast({ title: "Please fill in your name and email", variant: "destructive" });
      return;
    }
    if (!paymentMethod) {
      toast({ title: "Please select a payment method", variant: "destructive" });
      return;
    }

    if (paymentMethod === 'mobile') {
      const ussdCode = `*185*9*${effectiveAmount}*0744552195#`;
      toast({
        title: "Mobile Money Payment",
        description: `Dial ${ussdCode} to complete your $${effectiveAmount} investment in ${projectTitle}`,
      });
    } else if (paymentMethod === 'card') {
      toast({
        title: "Processing Card Payment",
        description: `Redirecting to secure payment for $${effectiveAmount} investment in ${projectTitle}`,
      });
    } else {
      toast({
        title: "Bank Transfer Details",
        description: `Bank: Stanbic Bank Uganda | Account: 9030123456789 | Reference: ${projectTitle}`,
      });
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-0 shadow-2xl overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${gradient}`} />
        <CardContent className="p-12 text-center">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mx-auto mb-6`}>
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Thank You for Your Investment!</h3>
          <p className="text-muted-foreground text-lg mb-2">
            Your ${effectiveAmount} contribution to <strong>{projectTitle}</strong> will create lasting impact.
          </p>
          <p className="text-muted-foreground text-sm">We'll send confirmation details to {email}.</p>
          <Button className="mt-6" onClick={() => setSubmitted(false)}>Make Another Contribution</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-2xl overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          Invest in {projectTitle}
        </CardTitle>
        <p className="text-muted-foreground">Your contribution directly supports this project's development</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Investment tier quick-select */}
          {investmentOptions && investmentOptions.length > 0 && (
            <div>
              <Label className="text-sm font-semibold mb-2 block">Quick Select Investment Tier</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {investmentOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.title}
                    onClick={() => {
                      setSelectedInvestment(opt.title);
                      setAmount(opt.amount.replace(/[^0-9]/g, ''));
                      setCustomAmount('');
                    }}
                    className={`text-left p-3 rounded-lg border-2 transition-all ${
                      selectedInvestment === opt.title
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-semibold text-foreground text-sm">{opt.title}</span>
                    <Badge className={`ml-2 bg-gradient-to-r ${gradient} text-white border-0 text-xs`}>
                      {opt.amount}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Amount selection */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">Or Choose Amount (USD)</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {presetAmounts.map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => { setAmount(val); setCustomAmount(''); setSelectedInvestment(''); }}
                  className={`py-2 px-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                    amount === val ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
            <Input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setAmount('custom'); setSelectedInvestment(''); }}
              min="1"
            />
          </div>

          {/* Contact info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inv-name">Full Name *</Label>
              <Input id="inv-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="inv-email">Email *</Label>
              <Input id="inv-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
          </div>

          {/* Payment method */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">Payment Method</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'mobile' as const, icon: Phone, label: 'Mobile Money' },
                { id: 'card' as const, icon: CreditCard, label: 'Card' },
                { id: 'bank' as const, icon: Building2, label: 'Bank Transfer' },
              ].map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <method.icon className={`h-5 w-5 ${paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-xs font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {paymentMethod === 'mobile' && (
            <div>
              <Label htmlFor="inv-phone">Phone Number</Label>
              <Input id="inv-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+256 7XX XXX XXX" />
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className={`w-full bg-gradient-to-r ${gradient} text-white hover:opacity-90 text-lg py-6`}
            disabled={!effectiveAmount || Number(effectiveAmount) <= 0}
          >
            <DollarSign className="mr-2 h-5 w-5" />
            Invest ${effectiveAmount || '0'} in {projectTitle}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payment • Tax-deductible • You'll receive an investment receipt
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectInvestmentForm;
