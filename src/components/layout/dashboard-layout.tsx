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
import { Home, History, LogOut, Bot, TrendingUp, User as UserIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';


function SidebarItems({ onLinkClick }: { onLinkClick?: () => void }) {
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
  
  const handleNavigation = (path: string) => {
    router.push(path);
    onLinkClick?.();
  }

  return (
    <>
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
              onClick={() => handleNavigation('/dashboard')}
              isActive={pathname === '/dashboard'}
              tooltip="Dashboard"
            >
              <Home />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleNavigation('/dashboard/history')}
              isActive={pathname === '/dashboard/history'}
              tooltip="History"
            >
              <History />
              <span>History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleNavigation('/dashboard/stats')}
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
    </>
  );
}

function DashboardLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  }
  
  return (
    <TooltipProvider>
    <div className="flex h-screen w-full bg-muted/30">
      <Sidebar className="hidden md:flex border-r" collapsible="icon">
        <SidebarItems onLinkClick={() => setOpenMobile(false)} />
      </Sidebar>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary"/>
              <span className="font-bold">QuizWhiz AI</span>
          </div>
          <nav className="flex items-center gap-1">
              <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant={pathname === '/dashboard' ? 'secondary' : 'ghost'} size="icon" onClick={() => handleNavigation('/dashboard')}>
                          <Home className="h-5 w-5" />
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>Dashboard</TooltipContent>
              </Tooltip>
               <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant={pathname === '/dashboard/history' ? 'secondary' : 'ghost'} size="icon" onClick={() => handleNavigation('/dashboard/history')}>
                          <History className="h-5 w-5" />
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>History</TooltipContent>
              </Tooltip>
               <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant={pathname === '/dashboard/stats' ? 'secondary' : 'ghost'} size="icon" onClick={() => handleNavigation('/dashboard/stats')}>
                          <TrendingUp className="h-5 w-5" />
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>Stats</TooltipContent>
              </Tooltip>
              <SidebarTrigger>
                <UserIcon className="h-5 w-5"/>
              </SidebarTrigger>
          </nav>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      {/* Mobile sidebar content, which is now separate for profile/logout */}
      <Sidebar collapsible="offcanvas">
           <SidebarItems onLinkClick={() => setOpenMobile(false)} />
      </Sidebar>
    </div>
    </TooltipProvider>
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
