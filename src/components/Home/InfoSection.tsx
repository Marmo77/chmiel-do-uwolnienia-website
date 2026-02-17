import { Button } from "../ui/button";
import { Clock, MapPin, Phone, ArrowUpRight, Mail } from "lucide-react";
import { siteData } from "../../data/siteData";

const InfoSection = () => {
  return (
    <section
      className="bg-[#050505] relative overflow-hidden border-t border-white/5"
      id="about"
    >
      {/* Background Ambience */}
      <div className="absolute left-0 bottom-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 pt-24 pb-12">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-primary tracking-[0.3em] uppercase mb-4">
            Lokalizacja & Kontakt
          </h2>
          <h3 className="text-5xl font-display font-bold text-white">
            ZNAJDŹ NAS
          </h3>
        </div>

        {/* Brutalist Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-y border-white/10">
          {/* Column 1: Location */}
          <div className="lg:border-r border-b lg:border-b-0 border-white/10 p-10 flex flex-col items-center text-center group transition-colors hover:bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-8 text-white group-hover:text-primary group-hover:border-primary transition-all shadow-xl">
              <MapPin className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-display font-bold text-white mb-4 tracking-wide">
              ADRES
            </h4>
            <div className="space-y-1 text-white/60 mb-8 font-light leading-relaxed">
              <p className="text-white text-lg font-semibold">
                {siteData.contact.address.street}
              </p>
              <p>
                {siteData.contact.address.zip} {siteData.contact.address.city}
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-auto gap-2 border-white/10 hover:bg-white/5 hover:text-white rounded-md uppercase tracking-widest text-xs h-12 px-8"
              onClick={() =>
                window.open(
                  `${siteData.contact.address.googleMapsUrl}`,
                  "_blank",
                )
              }
            >
              Nawiguj <ArrowUpRight className="ml-2 w-3 h-3" />
            </Button>
          </div>

          {/* Column 2: Hours */}
          <div className="lg:border-r border-b lg:border-b-0 border-white/10 p-10 flex flex-col items-center group transition-colors hover:bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-8 text-white group-hover:text-primary group-hover:border-primary transition-all shadow-xl">
              <Clock className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-display font-bold text-white mb-6 tracking-wide">
              GODZINY
            </h4>
            <div className="w-full space-y-3">
              {siteData.hours.display.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm w-full border-b border-white/5 pb-2 last:border-0"
                >
                  <span className="text-white/40 uppercase tracking-wider font-semibold text-[10px]">
                    {item.day}
                  </span>
                  <span
                    className={
                      item.hours === "Nieczynne"
                        ? "text-red-400"
                        : "text-white font-medium"
                    }
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="p-10 flex flex-col items-center text-center group transition-colors hover:bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
            <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-8 text-white group-hover:text-primary group-hover:border-primary transition-all shadow-xl">
              <Phone className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-display font-bold text-white mb-4 tracking-wide">
              KONTAKT
            </h4>
            <div className="space-y-6 mb-8 w-full">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                  Rezerwacje
                </p>
                <a
                  href={`tel:${siteData.contact.phone.replace(/\s/g, "")}`}
                  className="text-2xl font-bold text-white hover:text-primary transition-colors block"
                >
                  {siteData.contact.phone}
                </a>
              </div>
              <div className="w-12 h-px bg-white/10 mx-auto" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                  E-mail
                </p>
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="text-lg text-white/80 hover:text-white transition-colors block"
                >
                  {siteData.contact.email}
                </a>
              </div>
            </div>
            <Button
              className="mt-auto bg-primary text-black hover:bg-white w-full rounded-md uppercase tracking-widest text-xs h-12 font-bold"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Rezerwuj Online
            </Button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-xl bg-[#111] border border-white/5 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 text-center md:text-left">
          <div>
            <h5 className="text-white text-lg font-semibold tracking-wide mb-1">
              Planujesz imprezę ?
            </h5>
            <p className="text-white/50 text-sm">
              U nas zorganizujesz ją wygodnie, z indywidualnie ustalonym menu i
              przyjazną atmosferą.
            </p>
          </div>
          <a
            href={`mailto:${siteData.contact.email}`}
            className="text-primary font-bold hover:text-white transition-colors flex items-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Zapytaj o ofertę
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
