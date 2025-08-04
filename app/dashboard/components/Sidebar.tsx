import { Button } from "@/app/components/ui/button";
import { 
  BrainCog, 
  LibraryBig, 
  Settings, 
  FileMusic
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: BrainCog, label: "MoodMatch AI", href: "/dashboard", name:"dashbaord" },
  { icon: LibraryBig, label: "Discover" , href: "/dashboard/discover", name:"discover"},
  { icon: FileMusic, label: "My Playlists" , href: "/dashboard/playlists", name:"playlists"},
  { icon: Settings, label: "Settings", href: "/dashboard/settings", name:"settings" },
];

const Sidebar = () => {

const pathname = usePathname(); 
console.log(pathname)


  return (
    <div className="w-64 h-screen fixed top-0 left-0 z-50 bg-dashboard-sidebar border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Analytics Suite</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
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
      </nav>
      
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