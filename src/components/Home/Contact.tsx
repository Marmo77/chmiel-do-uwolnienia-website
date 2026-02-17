import React, { useState } from "react";
import { Button } from "../ui/button";
import { CalendarIcon, Clock, Beer } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import { cn } from "../../lib/utils";
import { siteData } from "../../data/siteData";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

const Contact = () => {
  const [agreed, setAgreed] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [phone, setPhone] = useState("+48 ");
  const [time, setTime] = useState("18:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (errors.phone) setErrors({ ...errors, phone: false });

    // Ensure +48 prefix
    if (!value.startsWith("+48 ")) {
      value = "+48 " + value.replace(/^\+48\s?/, "");
    }

    // Allow only numbers and space after prefix
    const rawNumber = value.slice(4).replace(/\D/g, "");

    // Format: 000 000 000
    let formattedNumber = "";
    for (let i = 0; i < rawNumber.length; i++) {
      if (i > 0 && i % 3 === 0 && i < 9) {
        formattedNumber += " ";
      }
      formattedNumber += rawNumber[i];
    }

    // Limit length to prevent infinite typing
    if (rawNumber.length > 9) return;

    setPhone("+48 " + formattedNumber);
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = true;
      isValid = false;
    }
    if (phone.length < 13) {
      // +48 + 9 digits + 2 spaces = 15 chars roughly, but let's check length of digits
      // Simple check: "+48 " is 4 chars. We need 9 digits.
      // Current format adds spaces: "+48 123 456 789" -> length 15.
      // Minimal check: has at least some digits.
      // Let's stick to checking if it's default or empty.
      if (phone.trim() === "+48" || phone.trim() === "+48 ") {
        newErrors.phone = true;
        isValid = false;
      }
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = true;
      isValid = false;
    }
    if (!guests || parseInt(guests) < 1) {
      newErrors.guests = true;
      isValid = false;
    }
    if (!date) {
      newErrors.date = true;
      isValid = false;
    }
    if (!time) {
      newErrors.time = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsConfirmOpen(true);
    } else {
      toast.error("Proszę uzupełnić wymagane pola", {
        description: "Wymagane pola zostały zaznaczone na czerwono.",
      });
    }
  };

  const handleConfirm = () => {
    // Here you would typically send the data to a backend
    console.log("Reservation confirmed:", {
      name,
      phone,
      email,
      guests,
      date,
      time,
      message,
    });

    toast.success("Rezerwacja wysłana pomyślnie!", {
      description: "Skontaktujemy się z Tobą wkrótce w celu potwierdzenia.",
      duration: 5000,
    });

    // Clear form
    setName("");
    setPhone("+48 ");
    setEmail("");
    setGuests("");
    setDate(new Date());
    setTime("18:00");
    setMessage("");
    setAgreed(false);
    setIsConfirmOpen(false);
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-foreground text-white"
    >
      <Toaster position="top-center" richColors />
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-2 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2 mx-auto lg:mx-0">
              <Beer className="w-3 h-3 mr-2" /> Rezerwacja Online
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9]">
              ZAREZERWUJ <br />{" "}
              <span className="text-primary">SWÓJ STOLIK</span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Planujesz wieczór ze znajomymi? Upewnij się, że mamy dla Ciebie
              miejsce. Wypełnij formularz, a my zajmiemy się resztą.
            </p>
            <div className="pt-8 border-t border-white/10 mt-8">
              <p className="text-sm text-white/40 mb-2 font-display tracking-wide uppercase">
                Bezpośredni kontakt
              </p>
              <p className="text-2xl font-bold text-white">
                {siteData.contact.phone}
              </p>
            </div>
          </div>

          {/* Dark Industrial Form Card */}
          <div className="lg:col-span-3">
            <div className="p-8 md:p-10 bg-[#1a1a1a]/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/5 relative group">
              {/* Subtle gold glow border effect */}
              <div className="absolute inset-0 rounded-3xl border border-primary/20 pointer-events-none" />

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      Imię i Nazwisko <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: false });
                      }}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium placeholder:text-white/20",
                        errors.name ? "border-red-500" : "border-white/10",
                      )}
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      Numer telefonu <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium tracking-wide placeholder:text-white/20",
                        errors.phone ? "border-red-500" : "border-white/10",
                      )}
                      placeholder="+48 000 000 000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors({ ...errors, email: false });
                      }}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium placeholder:text-white/20",
                        errors.email ? "border-red-500" : "border-white/10",
                      )}
                      placeholder="email@adres.pl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="guests"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      Goście <span className="text-primary">*</span>
                    </label>
                    <input
                      type="number"
                      id="guests"
                      min="1"
                      max={"20"}
                      value={guests}
                      onChange={(e) => {
                        setGuests(e.target.value);
                        if (errors.guests)
                          setErrors({ ...errors, guests: false });
                      }}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium placeholder:text-white/20",
                        errors.guests ? "border-red-500" : "border-white/10",
                      )}
                      placeholder="4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Custom Date Picker - Dark Theme Adapted */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">
                      Data <span className="text-primary">*</span>
                    </label>
                    <Popover>
                      <PopoverTrigger className="w-full">
                        <div
                          className={cn(
                            "w-full bg-white/5 border rounded-xl px-4 py-4 text-base flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer text-white",
                            !date && "text-white/40",
                            errors.date ? "border-red-500" : "border-white/10",
                          )}
                        >
                          <span className="font-medium truncate">
                            {date
                              ? format(date, "PPP", { locale: pl })
                              : "Wybierz datę"}
                          </span>
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-50 text-primary" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#1a1a1a] border-white/10 text-white">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            if (newDate && errors.date)
                              setErrors({ ...errors, date: false });
                          }}
                          initialFocus
                          locale={pl}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          className="bg-[#1a1a1a] text-white"
                          classNames={{
                            day_selected:
                              "bg-primary text-black hover:bg-primary/90",
                            day_today: "bg-white/10 text-white",
                            day: "hover:bg-white/10 text-white rounded-md aria-disabled:opacity-30 aria-disabled:cursor-not-allowed",
                            caption: "text-white",
                            head_cell: "text-white/50",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">
                      Godzina <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);
                          if (errors.time)
                            setErrors({ ...errors, time: false });
                        }}
                        className={cn(
                          "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium appearance-none cursor-pointer",
                          errors.time ? "border-red-500" : "border-white/10",
                        )}
                      >
                        {Array.from({ length: 9 }).map((_, i) => {
                          const hour = 14 + i; // 14:00 to 22:00
                          return (
                            <React.Fragment key={hour}>
                              <option
                                value={`${hour}:00`}
                                className="bg-[#1a1a1a] text-white"
                              >{`${hour}:00`}</option>
                              <option
                                value={`${hour}:15`}
                                className="bg-[#1a1a1a] text-white"
                              >{`${hour}:15`}</option>
                              <option
                                value={`${hour}:30`}
                                className="bg-[#1a1a1a] text-white"
                              >{`${hour}:30`}</option>
                              <option
                                value={`${hour}:45`}
                                className="bg-[#1a1a1a] text-white"
                              >{`${hour}:45`}</option>
                            </React.Fragment>
                          );
                        })}
                      </select>
                      <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                  >
                    Wiadomość
                  </label>
                  <input
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium placeholder:text-white/20"
                    placeholder="Specjalne życzenia..."
                  />
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-5 h-5 border border-white/20 rounded bg-white/5 focus:ring-3 focus:ring-primary/30 accent-primary cursor-pointer"
                    />
                  </div>
                  <label
                    htmlFor="consent"
                    className="text-xs text-white/60 cursor-pointer select-none leading-relaxed"
                  >
                    Rozumiem, że rezerwacja jest potwierdzona{" "}
                    <span className="font-bold text-primary">
                      dopiero po otrzymaniu wiadomości zwrotnej
                    </span>{" "}
                    lub telefonu od restauracji.{" "}
                    <span className="text-primary">*</span>
                  </label>
                </div>

                <Button
                  className="w-full h-16 text-lg font-bold font-display tracking-wide rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 bg-primary text-black hover:bg-primary/90"
                  type="button"
                  disabled={!agreed}
                  onClick={handleSubmit}
                >
                  POTWIERDŹ REZERWACJĘ
                </Button>
              </form>
              <p className="text-xs mt-4 text-white/30 text-center leading-relaxed">
                Wysyłając wiadomość zgadzasz się na przetwarzanie danych
                osobowych w celu i zakresie niezbędnym do realizacji rezerwacji.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirm}
        data={{ name, phone, email, guests, date, time, message }}
      />
    </section>
  );
};

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  data: {
    name: string;
    phone: string;
    email: string;
    guests: string;
    date: Date | undefined;
    time: string;
    message: string;
  };
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  data,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display tracking-wide text-foreground">
            Potwierdź Dane Rezerwacji
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Sprawdź poprawność wprowadzonych danych przed wysłaniem rezerwacji.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              Imię:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.name || "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              Telefon:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.phone}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              Email:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.email || "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              Goście:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.guests || "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              Data:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.date ? format(data.date, "PPP", { locale: pl }) : "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              Godzina:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.time}
            </span>
          </div>
          {data.message && (
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right text-sm font-bold text-muted-foreground mt-1">
                Wiadomość:
              </span>
              <span className="col-span-3 font-medium text-foreground text-sm">
                {data.message}
              </span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Popraw Dane
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-primary text-black hover:bg-primary/90"
          >
            Wyślij Rezerwację
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Contact;
