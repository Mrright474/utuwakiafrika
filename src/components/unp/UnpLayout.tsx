import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Menu, LogOut, LayoutDashboard, UserCheck, ShieldCheck, Home, SlidersHorizontal, ScrollText, ClipboardPlus } from 'lucide-react';
import { UNP_GROUPS, UNP_MODULES } from '@/lib/unp/modules';
import { useUnpStaff } from '@/hooks/useUnpStaff';
import { useUnpPermissions } from '@/hooks/useUnpPermissions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ? <Icon className={className} /> : <Icons.Circle className={className} />;
};

const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { isPlatformAdmin } = useUnpStaff();
  const { abilityFor } = useUnpPermissions();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
      isActive
        ? 'bg-primary/10 text-primary font-medium'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    );

  return (
    <ScrollArea className="h-full">
      <nav className="p-3 space-y-6" aria-label="Platform modules">
        <div className="space-y-1">
          <NavLink to="/unp" end className={linkClass} onClick={onNavigate}>
            <LayoutDashboard className="h-4 w-4" />
            Executive Intelligence
          </NavLink>
          {isPlatformAdmin && (
            <NavLink to="/unp/approvals" className={linkClass} onClick={onNavigate}>
              <UserCheck className="h-4 w-4" />
              Staff Access Control
            </NavLink>
          )}
          {isPlatformAdmin && (
            <NavLink to="/unp/permissions" className={linkClass} onClick={onNavigate}>
              <SlidersHorizontal className="h-4 w-4" />
              Module Permissions
            </NavLink>
          )}
          <NavLink to="/unp/field" className={linkClass} onClick={onNavigate}>
            <ClipboardPlus className="h-4 w-4" />
            Field Data Collection
          </NavLink>
          <NavLink to="/unp/audit" className={linkClass} onClick={onNavigate}>
            <ScrollText className="h-4 w-4" />
            Audit Log
          </NavLink>
        </div>


        {UNP_GROUPS.map((group) => {
          const modules = UNP_MODULES.filter((m) => m.group === group && abilityFor(m.id).canView);
          if (!modules.length) return null;
          return (
            <div key={group} className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group}
              </p>
              {modules.map((m) => (
                <NavLink key={m.id} to={`/unp/m/${m.id}`} className={linkClass} onClick={onNavigate}>
                  <DynamicIcon name={m.icon} className="h-4 w-4 shrink-0" />
                  <span className="truncate">{m.label}</span>
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>
    </ScrollArea>
  );
};

const UnpLayout = ({ children }: { children: React.ReactNode }) => {
  const { account, level, signOut } = useUnpStaff();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/unp/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-card px-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-14 items-center gap-2 border-b px-4">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-semibold">Ubuntu NGO Platform</span>
            </div>
            <div className="h-[calc(100vh-3.5rem)]">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Ubuntu NGO Platform</p>
            <p className="hidden text-[11px] text-muted-foreground sm:block">Utu Wa Kiafrika · ImpactOS</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline" className="hidden capitalize sm:inline-flex">
            {level}
          </Badge>
          <span className="hidden text-sm text-muted-foreground md:inline">
            {account ? `${account.first_name} ${account.last_name}` : ''}
          </span>
          <Button variant="ghost" size="icon" aria-label="Go to public site" onClick={() => navigate('/')}>
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Sign out" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-72 shrink-0 border-r bg-card lg:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
            <SidebarNav />
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default UnpLayout;
