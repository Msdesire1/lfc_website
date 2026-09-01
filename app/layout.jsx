import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata = {
  title: "Living Faith Church New Jerusalem",
  description: "This initiative aims to strengthen the church's digital presence and expand its outreach.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen">
        {/* Outside AppShell so the shell itself can raise toasts, and so a toast
            survives the shell swapping its children on navigation. */}
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}
