import AdminLayout from '@/components/admin/AdminLayout';
import Form from './Form';
export function generateMetadata() {
  return {
    title: `Edit Social Media`,
  };
}

export default function SocialPage() {
  return (
    <AdminLayout activeItem='socialMedia'>
      <Form/>
    </AdminLayout>
  );
}
