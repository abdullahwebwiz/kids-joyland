import AdminLayout from '@/components/admin/AdminLayout';
import Form from './Form';
export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Edit Blog ${params.id}`,
  };
}

export default function BlogEditPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AdminLayout activeItem='blogs'>
      <Form blogId={params.id} />
    </AdminLayout>
  );
}
