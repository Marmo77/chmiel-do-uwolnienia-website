import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import { cn } from "../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const Contact = () => {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState<number>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [phone, setPhone] = useState("+48 ");
  const [time, setTime] = useState("18:00");
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formInfo, setFormInfo] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, phone: false }));
    let value = e.target.value;

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

  const handleFormSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    if (!name) newErrors.name = true;
    if (!email) newErrors.email = true;
    if (!guests) newErrors.guests = true;
    if (phone.length < 11) newErrors.phone = true;
    if (time.length !== 5) newErrors.time = true;

    setErrors(newErrors);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      Object.keys(newErrors).length === 0 &&
      agreed &&
      date &&
      date >= today
    ) {
      setIsDialogOpen(true);
    } else {
      document.getElementById("form_info")?.classList.add("text-red-500");
      setFormInfo("Któreś z wymaganych pól jest niepoprawne");
    }
  };

  // Potwierdzenie rezerwacji
  const confirmReservation = () => {
    document.getElementById("form_info")?.classList.remove("text-red-500");
    document.getElementById("form_info")?.classList.add("text-green-500");
    setFormInfo(
      "Rezerwacja wysłana poprawnie. Powinniśmy potwierdzić twoją rezerwację w ciągu 2-3 godzin.",
    );
    setName("");
    setEmail("");
    setGuests(undefined);
    setDate(new Date());
    setPhone("+48 ");
    setTime("18:00");
    setMessage("");
    setAgreed(false);
    setIsDialogOpen(false);
  };

  // guests limit = 16
  useEffect(() => {
    if (guests && guests > 16) {
      setGuests(16);
    }
  }, [guests]);

  const dateWithoutToday = new Date();
  dateWithoutToday.setDate(dateWithoutToday.getDate() - 1);
  return (
    <section
      id="rezerwacja"
      className="py-24 relative overflow-hidden bg-foreground text-background"
    >
      {/* Inverse theme for footer area */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
          Zarezerwuj Stolik
        </h2>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
          Wypełnij formularz, aby złożyć wstępną rezerwację.
        </p>

        <div className="p-8 md:p-12 bg-white rounded-3xl shadow-2xl text-foreground text-left border border-white/10">
          <form className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-gray-700 ml-1"
                >
                  Imię i Nazwisko <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: false }));
                  }}
                  className={cn(
                    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground/50",
                    errors.name && "border-red-500",
                  )}
                  placeholder="Jan Kowalski"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-bold text-gray-700 ml-1"
                >
                  Numer telefonu <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={cn(
                    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium tracking-wide placeholder:text-muted-foreground/50",
                    errors.phone && "border-red-500",
                  )}
                  placeholder="+48 000 000 000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-700 ml-1"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: false }));
                  }}
                  className={cn(
                    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground/50",
                    errors.email && "border-red-500",
                  )}
                  placeholder="twoj@email.com"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="guests"
                  className="text-sm font-bold text-gray-700 ml-1"
                >
                  Ilość osób <span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="16"
                  value={guests || ""}
                  onChange={(e) => {
                    setGuests(parseInt(e.target.value));
                    setErrors((prev) => ({ ...prev, guests: false }));
                  }}
                  className={cn(
                    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground/50",
                    errors.guests && "border-red-500",
                  )}
                  placeholder="4"
                />
              </div>

              {/* Custom Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Data rezerwacji <span className="text-primary">*</span>
                </label>
                <Popover>
                  <PopoverTrigger className="w-full">
                    <div
                      className={cn(
                        "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <span className="font-medium">
                        {date ? (
                          format(date, "PPP", { locale: pl })
                        ) : (
                          <span>Wybierz datę</span>
                        )}
                      </span>
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < dateWithoutToday} // Wyłącza daty wsteczne ale chce be
                      locale={pl}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Godzina <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <select
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      setErrors((prev) => ({ ...prev, time: false }));
                    }}
                    className={cn(
                      "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none cursor-pointer",
                      errors.time && "border-red-500",
                    )}
                  >
                    {Array.from({ length: 9 }).map((_, i) => {
                      const hour = 14 + i; // 14:00 to 22:00 every 15 minutes
                      return (
                        <React.Fragment key={hour}>
                          <option value={`${hour}:00`}>{`${hour}:00`}</option>
                          <option value={`${hour}:15`}>{`${hour}:15`}</option>
                          <option value={`${hour}:30`}>{`${hour}:30`}</option>
                          <option value={`${hour}:45`}>{`${hour}:45`}</option>
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-gray-700 ml-1"
                >
                  Wiadomość (opcjonalnie)
                </label>
                <input
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground/50"
                  placeholder="Specjalne życzenia..."
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="consent"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-primary/30 accent-primary cursor-pointer"
                />
              </div>
              <label
                htmlFor="consent"
                className="text-sm text-muted-foreground cursor-pointer select-none leading-relaxed"
              >
                Rozumiem, że rezerwacja jest potwierdzona{" "}
                <span className="font-bold text-foreground">
                  dopiero po otrzymaniu wiadomości zwrotnej
                </span>{" "}
                lub telefonu od restauracji.{" "}
                <span className="text-primary">*</span>
              </label>
            </div>
            <p
              className="text-foreground/30 text-center text-sm"
              id="form_info"
            >
              {formInfo}
            </p>

            <div className="w-full">
              <Button
                className="w-full h-16 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
                type="button"
                disabled={!agreed}
                onClick={handleFormSubmit}
              >
                Wyślij Prośbę o Rezerwację
              </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Potwierdzenie rezerwacji</DialogTitle>
                  <DialogDescription>
                    Sprawdź czy wprowadzone dane są poprawne.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 text-left">
                  <div className="grid grid-cols-2 gap-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Imię i nazwisko
                      </p>
                      <p className="font-medium">{name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Telefon
                      </p>
                      <p className="font-medium">{phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Data
                      </p>
                      <p className="font-medium">
                        {date && format(date, "PPP", { locale: pl })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Godzina
                      </p>
                      <p className="font-medium">{time}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Ilość osób
                      </p>
                      <p className="font-medium">{guests}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Email
                      </p>
                      <p className="font-medium">{email}</p>
                    </div>
                  </div>
                  {message && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Wiadomość
                      </p>
                      <p className="font-medium">{message}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Wróć
                  </Button>
                  <Button onClick={confirmReservation}>
                    Potwierdź rezerwację
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </form>
          <div className="flex items-center p-2">
            <h3>
              Rezerwacje można również złożyć telefonicznie:{" "}
              <a href="tel:+48123456789" className="text-primary font-bold">
                +48 123 456 789
              </a>{" "}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
