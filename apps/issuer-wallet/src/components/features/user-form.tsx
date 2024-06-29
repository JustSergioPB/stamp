import { Form } from "@components/ui/form";
import { User } from "@features/users/models";
import { UserZod, userZod } from "@features/users/models/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { useForm } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  lang: string;
  formValue?: User;
  orgId?: string;
}

export default function UserForm({ lang, formValue, children }: Props) {
  const { t } = useTranslation(lang, "users");

  const form = useForm<UserZod>({
    resolver: zodResolver(userZod),
    defaultValues: formValue,
  });

  function handleSubmit(formDate: UserZod) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}></form>
    </Form>
  );
}
