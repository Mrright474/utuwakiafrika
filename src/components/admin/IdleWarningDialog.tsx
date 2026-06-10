import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface IdleWarningDialogProps {
  open: boolean;
  msUntilSignOut: number;
  onStay: () => void;
  onSignOut: () => void;
}

const formatSeconds = (ms: number) => Math.max(0, Math.ceil(ms / 1000));

const IdleWarningDialog = ({
  open,
  msUntilSignOut,
  onStay,
  onSignOut,
}: IdleWarningDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Still there?</AlertDialogTitle>
          <AlertDialogDescription>
            For security, your admin session will be signed out in{' '}
            <span className="font-semibold text-foreground">
              {formatSeconds(msUntilSignOut)}s
            </span>{' '}
            due to inactivity.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onSignOut}>Sign out now</AlertDialogCancel>
          <AlertDialogAction onClick={onStay}>Stay signed in</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IdleWarningDialog;
