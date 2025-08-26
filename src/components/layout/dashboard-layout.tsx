'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Home, History, LogOut, Bot, TrendingUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '../theme-toggle';

function DashboardLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { state } = useSidebar();
  const { user } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Success', description: 'Logged out successfully' });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to log out',
      });
    }
  };

  return (
    <div className="flex h-screen w-full bg-muted/30">
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Bot className="w-7 h-7 text-primary" />
            </div>
            <h1
              className={`text-xl font-bold transition-opacity duration-300 ${
                state === 'collapsed' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              QuizWhiz AI
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push('/dashboard')}
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
              >
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push('/dashboard/history')}
                isActive={pathname === '/dashboard/history'}
                 tooltip="History"
              >
                <History />
                <span>History</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push('/dashboard/stats')}
                isActive={pathname === '/dashboard/stats'}
                 tooltip="Stats"
              >
                <TrendingUp />
                <span>Stats</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 space-y-2">
           <div className={`flex items-center gap-3 p-2 transition-all duration-300 rounded-lg bg-background/50 ${state === 'collapsed' ? 'justify-center' : ''}`}>
              <Avatar>
                <AvatarImage src={user?.photoURL || undefined} />
                <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className={`flex flex-col text-sm transition-opacity duration-300 overflow-hidden ${state === 'collapsed' ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                  <span className="font-semibold truncate">{user?.displayName || user?.email?.split('@')[0]}</span>
                  <span className="text-muted-foreground truncate">{user?.email}</span>
              </div>
          </div>
          <SidebarMenu>
             <div className={`flex items-center ${state === 'collapsed' ? 'flex-col space-y-2' : 'flex-row'}`}>
                <div className="flex-grow">
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut} tooltip="Log Out">
                            <LogOut />
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </div>
                <ThemeToggle />
             </div>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </SidebarProvider>
    )
}
