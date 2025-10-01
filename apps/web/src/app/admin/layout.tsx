import { SidebarNav } from '@/components/sidebar-nav';
import { adminNavItems } from '@/config/admin-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-background md:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
          <SidebarNav items={adminNavItems} className="flex-1" />
        </div>
      </aside>
      <div className="flex-1 overflow-auto">
        <main className="container py-6">{children}</main>
      </div>
    </div>
  );
}
