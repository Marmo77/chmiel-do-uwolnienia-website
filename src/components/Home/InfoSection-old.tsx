import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Mail,
  Navigation,
} from "lucide-react";
import { siteData } from "../../data/siteData";
import { Button } from "../ui/button";

const InfoSection: React.FC = () => {
  // Select a subset of important features to display
  const highlightedFeatures = siteData.features.slice(0, 8); // Display first 8

  return (
    <section
      className="w-full py-20 bg-foreground border-t border-white/5"
      id="about"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column: Contact & Location */}
          <div className="flex-1 space-y-12">
            <div className="flex flex-col w-full gap-1">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Znajdź nas w <br />
                <span className="text-primary">Goleniowie</span>
              </h2>
              <div className="flex items-start gap-4 mb-2">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-xl text-white font-medium">
                    {siteData.contact.address.street}
                  </p>
                  <p className="text-white/60">
                    {siteData.contact.address.zip}{" "}
                    {siteData.contact.address.city}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="gap-2 border-white/10 hover:bg-white/5 hover:text-white"
                  onClick={() =>
                    window.open(
                      siteData.contact.address.googleMapsUrl,
                      "_blank",
                    )
                  }
                >
                  <Navigation className="w-4 h-4" /> Nawiguj
                </Button>
                <Button
                  className="gap-2 bg-primary text-black hover:bg-primary/90"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Zarezerwuj Stolik
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-white">
                Kontakt
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:${siteData.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 text-white/80 hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">
                    {siteData.contact.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="flex items-center gap-4 text-white/80 hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">
                    {siteData.contact.email}
                  </span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-white">
                Udogodnienia
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {highlightedFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary/50" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hours & Map/Image */}
          <div className="flex-1 w-full space-y-8">
            {/* Map Placeholder */}
            <div className="w-full h-64 md:h-80 bg-zinc-800 rounded-2xl overflow-hidden relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2378.167825310862!2d14.828854976735522!3d53.66699197258451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aa091a1a72288d%3A0x6e2c3c6c138670b8!2sNadrzeczna%208%2C%2072-100%20Goleni%C3%B3w!5e0!3m2!1spl!2spl!4v1709669000000!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold text-white border border-white/10 pointer-events-none">
                ul. Nadrzeczna 8
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-display font-bold text-white">
                  Godziny Otwarcia
                </h3>
              </div>
              <div className="space-y-4">
                {siteData.hours.display.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-white/60">{item.day}</span>
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

            <Button
              className="w-full py-6 text-lg rounded-xl bg-[#ff8000] hover:bg-[#ff8000]/90 text-white font-bold tracking-wide"
              onClick={() => window.open(siteData.links.ordering, "_blank")}
            >
              ZAMÓW ONLINE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
