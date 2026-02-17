import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import {
  Beer,
  Menu,
  X,
  Phone,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "./lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (id: string) => {
    // If not on home page, go there first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Start", id: "start" },
    { label: "O Nas", id: "about" },
    { label: "Menu", id: "menu" },
    { label: "Wydarzenia", id: "events" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border py-3 shadow-sm text-foreground"
            : "bg-transparent py-6 text-white",
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => handleNavigation("start")}
          >
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
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary bg-transparent border-none cursor-pointer",
                  isScrolled
                    ? "text-foreground/80"
                    : "text-white/90 hover:text-white",
                )}
              >
                {item.label}
              </button>
            ))}

            {/* Dynamic Reservation Button */}
            <Button
              onClick={() => handleNavigation("contact")}
              className={cn(
                "group relative overflow-hidden rounded-full px-8 py-6 text-lg font-bold shadow-lg transition-all duration-500 w-[200px]",
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:shadow-primary/50"
                  : "bg-white text-foreground hover:bg-white hover:text-black border-transparent",
              )}
            >
              <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-[150%]">
                <span>Rezerwacja</span>
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-500 translate-y-[150%] group-hover:translate-y-0">
                <Phone className="w-4 h-4 mr-2" />
                <span className="whitespace-nowrap text-base">123 456 789</span>
              </div>
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
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.id)}
                className="text-xl font-bold p-4 hover:bg-muted rounded-xl transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <Button
              className="w-full h-14 text-lg rounded-xl"
              onClick={() => handleNavigation("contact")}
            >
              Zarezerwuj Stolik
            </Button>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="pt-0">{children}</div>

      {/* Industrial Footer */}
      <footer className="bg-[#0a0a0a] text-white border-t border-white/5 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-1 space-y-6">
              <Link
                to="/"
                className="flex items-center space-x-3"
                onClick={() => handleNavigation("start")}
              >
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <Beer className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-2xl font-display font-bold tracking-wider text-white">
                    CHMIEL
                  </span>
                  <span className="text-[0.5rem] font-bold tracking-[0.2em] text-primary uppercase w-full text-left">
                    Do Uwolnienia
                  </span>
                </div>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed">
                Prawdziwe rzemiosło, autentyczny smak. Miejsce, gdzie piwo
                spotyka się z pasją do jedzenia.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="font-display text-xl mb-6 text-white tracking-wide">
                Nawigacja
              </h4>
              <ul className="space-y-4 text-white/60">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Start
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    className="hover:text-primary transition-colors"
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    className="hover:text-primary transition-colors"
                  >
                    Wydarzenia
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-primary transition-colors"
                  >
                    Rezerwacja
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-1">
              <h4 className="font-display text-xl mb-6 text-white tracking-wide">
                Znajdź Nas
              </h4>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-primary shrink-0" />
                  <span>
                    ul. Chmielna 123
                    <br />
                    00-000 Warszawa
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                  <span>+48 123 456 789</span>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="md:col-span-1">
              <h4 className="font-display text-xl mb-6 text-white tracking-wide">
                Otwarte
              </h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Pn - Czw</span>
                  <span className="text-white">16:00 - 23:00</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Piątek</span>
                  <span className="text-white">16:00 - 02:00</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Sobota</span>
                  <span className="text-white">14:00 - 02:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Niedziela</span>
                  <span className="text-white">14:00 - 22:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
            <div className="mb-4 md:mb-0">
              &copy; 2024 Chmiel do Uwolnienia. Wszelkie prawa zastrzeżone.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Polityka Prywatności
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Regulamin
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
