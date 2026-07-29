import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, Clock, ShieldX } from 'lucide-react';
import { useUnpStaff } from '@/hooks/useUnpStaff';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Gate for /unp/*: requires an authenticated user with an approved
 * staff account. Pending accounts see a waiting-room screen.
 */
const UnpProtectedRoute = ({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) => {
  const { user, account, loading, approved, isPlatformAdmin, signOut } = useUnpStaff();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/unp/auth" replace state={{ from: location.pathname }} />;
  }

  if (!account || !approved) {
    const rejected = account?.status === 'rejected' || account?.status === 'suspended';
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              {rejected ? (
                <ShieldX className="h-6 w-6 text-destructive" />
              ) : (
                <Clock className="h-6 w-6 text-primary" />
              )}
            </div>
            <CardTitle>
              {rejected ? 'Access not granted' : 'Awaiting administrator approval'}
            </CardTitle>
            <CardDescription>
              {rejected
                ? 'Your staff account is not currently active. Please contact your platform administrator.'
                : account
                  ? 'Your staff account has been created and is pending review. You will gain access as soon as an administrator approves it and assigns your department.'
                  : 'No staff profile is linked to this login. Please register for a staff account.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {!account && (
              <Button asChild>
                <a href="/unp/auth">Register a staff account</a>
              </Button>
            )}
            <Button variant="outline" onClick={() => void signOut()}>
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (adminOnly && !isPlatformAdmin) {
    return <Navigate to="/unp" replace />;
  }

  return <>{children}</>;
};

export default UnpProtectedRoute;
