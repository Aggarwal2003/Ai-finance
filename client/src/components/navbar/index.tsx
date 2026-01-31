import { useState, useMemo, useCallback } from "react";
import { Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { cn } from "@/lib/utils";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import { UserNav } from "./user-nav";
import LogoutDialog from "./logout-dialog";
import { useTypedSelector } from "@/app/hook";

type RouteItem = {
  href: string;
  label: string;
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useTypedSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Memoize routes to prevent re-creation on every render
  const routes: RouteItem[] = useMemo(
    () => [
      { href: PROTECTED_ROUTES.OVERVIEW, label: "Overview" },
      { href: PROTECTED_ROUTES.TRANSACTIONS, label: "Transactions" },
      { href: PROTECTED_ROUTES.REPORTS, label: "Reports" },
      { href: PROTECTED_ROUTES.SETTINGS, label: "Settings" },
    ],
    []
  );

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "w-full bg-[var(--secondary-dark-color)] px-4 py-3 text-white lg:px-14",
          pathname === PROTECTED_ROUTES.OVERVIEW && "pb-3"
        )}
      >
        <div className="mx-auto flex h-14 max-w-[var(--max-width)] items-center">
          <div className="flex w-full items-center justify-between">
            {/* Left - Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button
                aria-label="Open navigation menu"
                variant="ghost"
                size="icon"
                className="inline-flex !cursor-pointer !bg-white/10 !text-white hover:!bg-white/20 md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>

              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-x-2 overflow-x-auto md:flex"
            >
              {routes.map((route) => {
                const isActive = pathname === route.href;

                return (
                  <Button
                    key={route.href}
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "w-full border-none bg-transparent py-2 text-[14.5px] font-normal text-white/60 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 lg:w-auto",
                      isActive && "text-white"
                    )}
                    asChild
                  >
                    <NavLink to={route.href}>{route.label}</NavLink>
                  </Button>
                );
              })}
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetContent side="left" className="bg-white">
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-y-2 pt-9"
                >
                  {routes.map((route) => {
                    const isActive = pathname === route.href;

                    return (
                      <Button
                        key={route.href}
                        size="sm"
                        variant="ghost"
                        className={cn(
                          "w-full justify-start border-none bg-transparent py-2 font-normal text-black/70 transition hover:bg-black/5 hover:text-black focus-visible:ring-2 focus-visible:ring-black/30",
                          isActive && "bg-black/10 text-black"
                        )}
                        asChild
                        onClick={closeMobileMenu}
                      >
                        <NavLink to={route.href}>{route.label}</NavLink>
                      </Button>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Right - User Menu */}
            <div className="flex items-center space-x-4">
              <UserNav
                userName={user?.name || "User"}
                profilePicture={user?.profilePicture || ""}
                onLogout={() => setIsLogoutDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        setIsOpen={setIsLogoutDialogOpen}
      />
    </>
  );
};

export default Navbar;
