import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUnpStaff } from '@/hooks/useUnpStaff';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ShieldCheck } from 'lucide-react';

const UnpAuth = () => {
  const { user, account, loading } = useUnpStaff();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '', position: '',
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user && account?.status === 'approved') return <Navigate to="/unp" replace />;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: signInData.email.trim(),
      password: signInData.password,
    });
    setBusy(false);
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
      return;
    }
    navigate('/unp');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password.length < 8) {
      toast({ title: 'Weak password', description: 'Use at least 8 characters.', variant: 'destructive' });
      return;
    }
    setBusy(true);
    const email = signUpData.email.trim();
    const { data, error } = await supabase.auth.signUp({
      email,
      password: signUpData.password,
      options: { emailRedirectTo: `${window.location.origin}/unp` },
    });

    if (error) {
      setBusy(false);
      toast({ title: 'Registration failed', description: error.message, variant: 'destructive' });
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('unp_staff_accounts').insert({
        user_id: data.user.id,
        first_name: signUpData.firstName.trim(),
        last_name: signUpData.lastName.trim(),
        email,
        phone: signUpData.phone.trim() || null,
        position: signUpData.position.trim() || null,
      });
      if (profileError) {
        setBusy(false);
        toast({
          title: 'Account created, profile pending',
          description: `Sign in again to complete your staff profile. (${profileError.message})`,
          variant: 'destructive',
        });
        return;
      }
    }

    setBusy(false);
    toast({
      title: 'Registration submitted',
      description: 'An administrator will review your request and assign your department and access level.',
    });
    navigate('/unp');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <SEO
        title="Staff Login | Ubuntu NGO Platform"
        description="Secure staff access to the Utu Wa Kiafrika Ubuntu NGO Platform for programmes, grants, finance and field operations."
        path="/unp/auth"
        noindex
      />

      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Ubuntu NGO Platform</h1>
          <p className="text-sm text-muted-foreground">Staff portal · Utu Wa Kiafrika</p>
        </div>

        <Card>
          <Tabs defaultValue="signin">
            <CardHeader className="pb-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Request access</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <CardDescription>Sign in with your staff credentials.</CardDescription>
                  <div>
                    <Label htmlFor="si-email">Work email</Label>
                    <Input id="si-email" type="email" required value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="si-password">Password</Label>
                    <Input id="si-password" type="password" required value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full" disabled={busy}>
                    {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign in
                  </Button>
                </CardContent>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <CardDescription>
                    Register for staff access. An administrator approves your account and assigns
                    your department before you can view organizational data.
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="su-first">First name</Label>
                      <Input id="su-first" required value={signUpData.firstName}
                        onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="su-last">Last name</Label>
                      <Input id="su-last" required value={signUpData.lastName}
                        onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="su-email">Work email</Label>
                    <Input id="su-email" type="email" required value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="su-position">Position</Label>
                    <Input id="su-position" value={signUpData.position}
                      onChange={(e) => setSignUpData({ ...signUpData, position: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="su-phone">Phone</Label>
                    <Input id="su-phone" value={signUpData.phone}
                      onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="su-password">Password</Label>
                    <Input id="su-password" type="password" required minLength={8} value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full" disabled={busy}>
                    {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit request
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default UnpAuth;
