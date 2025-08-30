import Form from '@/app/ui/user/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/user' },
          {
            label: 'Create User',
            href: '/dashboard/user/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}