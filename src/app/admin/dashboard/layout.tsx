import Link from "next/link";
import {
  Package,
  Home,
  Settings,
  Bell,
  BarChart2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import Logo from "@/components/logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Logo />
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2 text-primary transition-all hover:text-primary"
                href="#"
              >
                <Home className="h-4 w-4" />
                Orders
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="#"
              >
                <BarChart2 className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="#"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-card px-6">
          <Link className="lg:hidden" href="#">
            <Package className="h-6 w-6" />
            <span className="sr-only">Orders</span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">Order Management</h1>
          </div>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <Avatar>
                  <AvatarImage src="https://placehold.co/32x32" alt="@admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                 <Link href="/home">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
