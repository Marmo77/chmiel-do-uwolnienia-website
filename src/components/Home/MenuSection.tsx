import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { menuData } from "../../data/menuData";
import LoadingSkeletons from "../../LoadingSkeletons";
import { Dialog, DialogContent } from "../ui/dialog";
import { ZoomIn } from "lucide-react";

const MenuSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="menu" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 text-center space-y-4">
            <div className="h-10 w-48 bg-muted rounded mx-auto animate-pulse" />
            <div className="h-4 w-64 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LoadingSkeletons />
            <LoadingSkeletons />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-24 px-4 bg-secondary/30 relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/10 rounded-full blur-2xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
            Smak, który uwodzi
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            NASZE MENU
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Kliknij w kartę, aby powiększyć.
          </p>
        </div>

        <Tabs defaultValue="burgers" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-transparent p-2 h-auto gap-4 rounded-full flex-wrap justify-center">
              {menuData.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full px-8 py-4 text-xl font-display tracking-wide border-2 border-transparent 
                  data-[state=active]:bg-foreground data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-lg 
                  bg-white/50 text-muted-foreground hover:text-primary hover:bg-white
                  transition-all duration-300"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {menuData.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {category.menuImages.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-white rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-500 border border-border/50 cursor-zoom-in"
                    onClick={() => setSelectedImage(imgSrc)}
                  >
                    <img
                      src={imgSrc}
                      alt={`${category.label} menu strona ${index + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 backdrop-blur text-foreground px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ZoomIn className="w-4 h-4" /> Powiększ
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl bg-transparent shadow-none border-none p-0 flex items-center justify-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Menu Full Screen"
              className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MenuSection;
