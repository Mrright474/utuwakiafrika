import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUnpStaff } from '@/hooks/useUnpStaff';
import SEO from '@/components/seo/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UNP_GROUPS, UNP_MODULES } from '@/lib/unp/modules';
import { Loader2, Users, FolderKanban, FileSignature, IdCard, Wallet, ShieldAlert } from 'lucide-react';

const COUNT_CARDS = [
  { label: 'Staff', table: 'org_staff', icon: Users, to: '/unp/m/staff' },
  { label: 'Active projects', table: 'org_projects', icon: FolderKanban, to: '/unp/m/projects', filter: { column: 'status', value: 'active' } },
  { label: 'Grants tracked', table: 'unp_grants', icon: FileSignature, to: '/unp/m/grants' },
  { label: 'Beneficiaries', table: 'unp_beneficiaries', icon: IdCard, to: '/unp/m/beneficiaries' },
  { label: 'Finance entries', table: 'unp_finance_transactions', icon: Wallet, to: '/unp/m/finance' },
  { label: 'Open risks', table: 'unp_risks', icon: ShieldAlert, to: '/unp/m/risks', filter: { column: 'status', value: 'open' } },
];

const UnpDashboard = () => {
  const { account } = useUnpStaff();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const results = await Promise.all(
        COUNT_CARDS.map(async (c) => {
          let q = supabase.from(c.table as any).select('*', { count: 'exact', head: true });
          if (c.filter) q = q.eq(c.filter.column, c.filter.value);
          const { count } = await q;
          return [c.label, count ?? 0] as const;
        })
      );
      setCounts(Object.fromEntries(results));
      setLoading(false);
    };
    void run();
  }, []);

  return (
    <div className="space-y-6">
      <SEO
        title="Executive Intelligence | Ubuntu NGO Platform"
        description="Organization-wide dashboard for staff, projects, grants, beneficiaries, finance and risk."
        path="/unp"
        noindex
      />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Karibu{account ? `, ${account.first_name}` : ''}
        </h1>
        <p className="text-sm text-muted-foreground">
          Executive intelligence across the whole organization.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNT_CARDS.map((c) => (
            <Link key={c.label} to={c.to}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{counts[c.label] ?? 0}</p>
                    <p className="text-sm text-muted-foreground">{c.label}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {UNP_GROUPS.map((group) => (
        <Card key={group}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{group}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {UNP_MODULES.filter((m) => m.group === group).map((m) => (
              <Link
                key={m.id}
                to={`/unp/m/${m.id}`}
                className="rounded-md border p-3 transition-colors hover:bg-muted"
              >
                <p className="text-sm font-medium">{m.label}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{m.description}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UnpDashboard;
