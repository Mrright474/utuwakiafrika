import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, HandCoins, CheckCircle, XCircle, Download, Phone, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { exportToCSV } from '@/utils/exportData';

interface DonationRequest {
  id: string;
  donor_name: string;
  phone: string;
  email: string | null;
  amount: number;
  currency: string;
  provider: string;
  note: string | null;
  status: string;
  created_at: string;
}

const providerLabel: Record<string, string> = {
  airtel: 'Airtel Money',
  mtn: 'MTN MoMo',
};

const statusVariant = (status: string) =>
  status === 'confirmed' ? 'default' : status === 'cancelled' ? 'destructive' : 'secondary';

const formatMoney = (amount: number, currency: string) =>
  `${currency} ${Number(amount).toLocaleString('en-UG', { maximumFractionDigits: 0 })}`;

const DonationsTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['donation-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donation_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as DonationRequest[];
    },
  });

  React.useEffect(() => {
    const channel = supabase
      .channel('donation-requests-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donation_requests' }, () => {
        queryClient.invalidateQueries({ queryKey: ['donation-requests'] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('donation_requests').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donation-requests'] });
      toast({ title: 'Donation updated' });
    },
    onError: () => toast({ title: 'Could not update donation', variant: 'destructive' }),
  });

  const totals = React.useMemo(() => {
    const confirmed = donations.filter((d) => d.status === 'confirmed');
    const pending = donations.filter((d) => d.status === 'pending');
    const sum = (list: DonationRequest[]) => list.reduce((acc, d) => acc + Number(d.amount), 0);
    return {
      confirmedAmount: sum(confirmed),
      pendingAmount: sum(pending),
      confirmedCount: confirmed.length,
      pendingCount: pending.length,
    };
  }, [donations]);

  const handleExport = () => {
    exportToCSV(
      donations.map((d) => ({ ...d, provider: providerLabel[d.provider] ?? d.provider })),
      ['donor_name', 'phone', 'email', 'amount', 'currency', 'provider', 'status', 'note', 'created_at'],
      `donations-${new Date().toISOString().slice(0, 10)}`
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-utu-red" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Confirmed total</CardDescription>
            <CardTitle className="text-2xl">{formatMoney(totals.confirmedAmount, 'UGX')}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending total</CardDescription>
            <CardTitle className="text-2xl">{formatMoney(totals.pendingAmount, 'UGX')}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Confirmed donations</CardDescription>
            <CardTitle className="text-2xl">{totals.confirmedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Awaiting confirmation</CardDescription>
            <CardTitle className="text-2xl">{totals.pendingCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <HandCoins className="mr-2 h-5 w-5" />
              Mobile Money Donations
            </CardTitle>
            <CardDescription>
              Every tap-to-donate submission with amount, operator and time received.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={donations.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No donations recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {donations.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-lg p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{d.donor_name}</span>
                      <Badge variant="outline">{providerLabel[d.provider] ?? d.provider}</Badge>
                      <Badge variant={statusVariant(d.status)}>{d.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                      <span className="flex items-center">
                        <Phone className="mr-1 h-3.5 w-3.5" />
                        {d.phone}
                      </span>
                      {d.email && <span>{d.email}</span>}
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        {new Date(d.created_at).toLocaleString()}
                      </span>
                    </div>
                    {d.note && <p className="text-sm italic text-muted-foreground">"{d.note}"</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold whitespace-nowrap">
                      {formatMoney(d.amount, d.currency)}
                    </span>
                    {d.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateStatus.mutate({ id: d.id, status: 'confirmed' })}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus.mutate({ id: d.id, status: 'cancelled' })}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsTab;
