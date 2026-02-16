import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, MapPin, Phone, ArrowRight } from "lucide-react";

const InfoSection = () => {
  return (
    <section className="py-24 bg-background border-y border-border" id="onas">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Card className="relative bg-white border border-border/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
              <CardContent className="pt-10 pb-10 px-8 flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="mb-6 inline-flex p-5 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg">
                    <Clock className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6 text-foreground tracking-wide">
                    Godziny Otwarcia
                  </h3>
                  <div className="space-y-3 text-lg">
                    <div className="flex justify-between w-full max-w-[200px] mx-auto border-b border-dashed border-gray-200 pb-1">
                      <span className="text-muted-foreground font-medium">
                        Pn - Czw
                      </span>
                      <span className="font-bold text-foreground">
                        16:00 - 23:00
                      </span>
                    </div>
                    <div className="flex justify-between w-full max-w-[200px] mx-auto border-b border-dashed border-gray-200 pb-1">
                      <span className="text-muted-foreground font-medium">
                        Pt - Sob
                      </span>
                      <span className="font-bold text-foreground">
                        16:00 - 02:00
                      </span>
                    </div>
                    <div className="flex justify-between w-full max-w-[200px] mx-auto text-primary">
                      <span className="font-medium">Nd</span>
                      <span className="font-bold">14:00 - 22:00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Card className="relative bg-white border border-border/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
              <CardContent className="pt-10 pb-10 px-8 flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="mb-6 inline-flex p-5 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-foreground tracking-wide">
                    Lokalizacja
                  </h3>
                  <div className="text-lg text-muted-foreground font-medium leading-relaxed">
                    <p>ul. Chmielna 123</p>
                    <p>00-000 Warszawa</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="mt-6 text-primary font-bold text-lg group-hover:translate-x-1 transition-transform p-0 hover:no-underline"
                >
                  Sprawdź dojazd <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Card className="relative bg-white border border-border/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
              <CardContent className="pt-10 pb-10 px-8 flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="mb-6 inline-flex p-5 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg">
                    <Phone className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-foreground tracking-wide">
                    Kontakt
                  </h3>
                  <p className="text-2xl font-bold text-foreground mb-1">
                    +48 123 456 789
                  </p>
                  <p className="text-muted-foreground font-medium">
                    kontakt@chmieluwolniony.pl
                  </p>
                </div>
                <Button className="mt-8 w-full rounded-xl font-bold bg-foreground text-background hover:bg-primary hover:text-white shadow-lg transition-all">
                  Zadzwoń Teraz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
