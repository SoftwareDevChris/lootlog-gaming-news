import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DashboardFieldContainer } from "../containers/DashboardFieldContainer";

type Props = {
  title: string;
  description: string;
};

export const DashboardDeleteAccountField: React.FC<Props> = ({
  title,
  description,
}) => {
  return (
    <DashboardFieldContainer>
      <div>
        <span className="font-medium text-neutral-900">{title}</span>
        <p className="pt-2 text-sm text-neutral-500">{description}</p>
      </div>
      <div className="mt-4 lg:mt-0">
        <AlertDialog>
          <AlertDialogTrigger className="rounded-md bg-red-600 px-3 py-2 text-neutral-100 hover:bg-red-700">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 px-3 py-2 text-neutral-100 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardFieldContainer>
  );
};
