import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/session";
import { ROLE_LABELS } from "@/lib/roles";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ToastProvider } from "@/components/admin/toast";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar role={admin.role} />
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-muted/40">
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-white px-6">
            <span className="truncate text-sm text-muted-foreground">
              Signed in as <strong>{admin.email}</strong>
            </span>
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
              {ROLE_LABELS[admin.role]}
            </span>
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
