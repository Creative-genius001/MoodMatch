import { Button } from "@/app/components/ui/button";
import { 
  BrainCog, 
  LibraryBig, 
  // Settings, 
  FileMusic,
  X,
  Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type SidebarProps = {
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const menuItems = [
  { icon: BrainCog, label: "MoodMatch AI", href: "/dashboard", name:"dashbaord" },
  { icon: LibraryBig, label: "Discover" , href: "/dashboard/discover", name:"discover"},
  { icon: FileMusic, label: "My Playlists" , href: "/dashboard/playlists", name:"playlists"},
  // { icon: Settings, label: "Settings", href: "/dashboard/settings", name:"settings" },
];

const Sidebar = ({ isMobile, isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {

const pathname = usePathname();
 const sidebarRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile, setIsSidebarOpen]);


  const handleCloseSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleOpenSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(true);
    }
  };


  return (
    <div ref={sidebarRef} className={`w-64 h-screen transition-translate duration-500 ease-in-out fixed top-0 left-0 z-50 bg-dashboard-sidebar border-r border-border flex flex-col ${isMobile && (isSidebarOpen ? 'translate-x-0' : '-translate-x-full')}`}>
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Moodmatch AI</h1>
        <p className="text-sm text-muted-foreground">Best AI playlist generator</p>
      </div>

      {
        isMobile && (isSidebarOpen ? <span onClick={handleCloseSidebar} className="absolute top-8 -right-8 cursor-pointer"><X /></span> : <span onClick={handleOpenSidebar} className="absolute top-8 -right-10 cursor-pointer"><Menu className='w-7 h-7' /></span>)
      }
      
      <aside className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
                <Button
                    variant="sidebar"
                    className={`${pathname === item.href ? "bg-brightGreen text-foreground py-6" : "py-6"}`}
                    >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Button>
            </Link>
          
        ))}
      </aside>
      
      {/* <div className="p-4 border-t border-border">
        <div className="bg-gradient-card p-4 rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-2">Upgrade Plan</h3>
          <p className="text-xs text-muted-foreground mb-3">Get unlimited access to all features</p>
          <Button variant="dashboard" size="sm" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar