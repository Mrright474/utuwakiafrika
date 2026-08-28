import React from 'react';
import { Smartphone, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Founder mobile money lines (names: Ben Kazigo Luweru)
const AIRTEL_NUMBER = '0744496195';
const MTN_NUMBER = '0778777976';

// USSD deep-links — "#" must be URL-encoded as %23 in tel: links
const AIRTEL_USSD = `tel:*185*1*1*${AIRTEL_NUMBER}%23`; // Airtel Money → Send Money
const MTN_USSD = `tel:*165*1*1*${MTN_NUMBER}%23`; // MTN MoMo → Send Money

const MobileMoneyDonate = () => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyNumber = async (label: string, number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(label);
      toast({ title: 'Number copied', description: `${label}: ${number}` });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({ title: 'Copy failed', description: number, variant: 'destructive' });
    }
  };

  const channels = [
    {
      key: 'airtel',
      name: 'Airtel Money',
      number: AIRTEL_NUMBER,
      ussd: AIRTEL_USSD,
      code: `*185*1*1*${AIRTEL_NUMBER}#`,
      gradient: 'from-red-600 to-red-700',
      border: 'border-red-500/30',
      text: 'text-red-600',
    },
    {
      key: 'mtn',
      name: 'MTN Mobile Money',
      number: MTN_NUMBER,
      ussd: MTN_USSD,
      code: `*165*1*1*${MTN_NUMBER}#`,
      gradient: 'from-yellow-400 to-yellow-500',
      border: 'border-yellow-500/30',
      text: 'text-yellow-600',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-utu-green/10 border border-utu-green/20 rounded-full px-6 py-2 text-sm font-medium text-utu-green mb-4">
          <Smartphone className="mr-2 h-4 w-4" />
          Instant Mobile Money Giving
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-utu-black font-heading mb-3">
          Donate with <span className="text-utu-red">Airtel</span> or <span className="text-yellow-500">MTN</span> Mobile Money
        </h2>
        <p className="text-utu-gray max-w-2xl mx-auto">
          Tap a button below and your phone will open the mobile money menu with our number already filled in —
          just enter your amount and confirm with your PIN. Both lines are registered to our founder,{' '}
          <span className="font-semibold text-utu-black">Ben Kazigo Luweru</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((c) => (
          <div
            key={c.key}
            className={`ubuntu-card rounded-2xl p-8 border-2 ${c.border} text-center hover:shadow-xl transition-all duration-300`}
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
              <Smartphone className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-utu-black mb-1">{c.name}</h3>
            <p className="text-2xl font-mono font-bold tracking-wider mb-1">
              <span className={c.text}>{c.number}</span>
            </p>
            <p className="text-xs text-utu-gray mb-5">Ben Kazigo Luweru</p>

            <a href={c.ussd} className="block">
              <Button
                size="lg"
                className={`w-full bg-gradient-to-r ${c.gradient} text-white font-bold text-lg py-6 hover:opacity-90 transition-opacity`}
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Tap to Donate via {c.name}
              </Button>
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-utu-gray">
              <span>
                Or dial <span className="font-mono font-semibold text-utu-black">{c.code}</span>
              </span>
              <button
                onClick={() => copyNumber(c.name, c.number)}
                className="inline-flex items-center text-utu-green hover:text-utu-green/80 font-medium"
                aria-label={`Copy ${c.name} number`}
              >
                {copied === c.name ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied === c.name ? 'Copied' : 'Copy number'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-utu-gray mt-6 max-w-xl mx-auto">
        The tap-to-donate buttons work best on a mobile phone. On a desktop, simply dial the code shown on your phone instead.
      </p>
    </div>
  );
};

export default MobileMoneyDonate;
