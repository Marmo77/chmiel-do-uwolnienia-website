import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Beer, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "./lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems: { label: string; id: string }[] = [
    {
      label: "Start",
      id: "hero", // Assuming top section is hero
    },
    {
      label: "O Nas",
      id: "onas",
    },
    {
      label: "Menu",
      id: "menu",
    },
    {
      label: "Kontakt",
      id: "rezerwacja",
    },
  ];

  const handleNavigation = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border py-4 shadow-sm text-foreground"
            : "bg-transparent py-6 text-white",
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div
              className={cn(
                "p-2.5 rounded-xl transition-transform duration-300 shadow-lg",
                isScrolled
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/10 backdrop-blur-md text-primary border border-white/20",
              )}
            >
              <Beer className="h-8 w-8" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span
                className={cn(
                  "text-3xl font-display font-bold tracking-wider transition-colors",
                  isScrolled ? "text-foreground" : "text-white",
                )}
              >
                CHMIEL
              </span>
              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-primary uppercase w-full text-left">
                Do Uwolnienia
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary cursor-pointer bg-transparent border-none",
                  isScrolled
                    ? "text-foreground/80"
                    : "text-white/90 hover:text-white",
                )}
              >
                {item.label}
              </button>
            ))}
            <Button
              className={cn(
                "rounded-full px-8 py-6 text-lg font-bold shadow-lg transition-all hover:scale-105",
                isScrolled
                  ? "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                  : "bg-white text-foreground hover:bg-primary hover:text-white border-transparent",
              )}
              onClick={() =>
                document
                  .getElementById("rezerwacja")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Rezerwacja
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-xl transition-colors",
              isScrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10",
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border p-6 flex flex-col space-y-4 animate-in slide-in-from-top-5 shadow-xl text-foreground">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavigation(item.id);
                }}
                className="text-xl font-bold p-4 hover:bg-muted rounded-xl transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <Button
              className="w-full h-14 text-lg rounded-xl"
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("rezerwacja")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Zarezerwuj Stolik
            </Button>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="pt-0">{children}</div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0 font-medium">
            &copy; 2024 Chmiel do Uwolnienia.
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="hover:text-primary transition-colors font-semibold"
            >
              Facebook
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors font-semibold"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors font-semibold"
            >
              Polityka Prywatności
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
