import AdminLayout from '@/components/admin/AdminLayout';
import Blogs from './blogs';

const AdminBlogssPge = () => {
  return (
    <AdminLayout activeItem='blogs'>
      <Blogs />
    </AdminLayout>
  );
};

export default AdminBlogssPge;
