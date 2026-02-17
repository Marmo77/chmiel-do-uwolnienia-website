import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "Czy muszę rezerwować stolik?",
    answer:
      "W weekendy (piątek-sobota) warto zadzwonić, bo bywa tłoczno. W tygodniu zazwyczaj znajdzie się miejsce dla każdego 'z ulicy'. Jak planujesz wpaść większą ekipą (6+ osób), daj znać wcześniej, przygotujemy stolik.",
  },
  {
    question: "Macie coś bez mięsa?",
    answer:
      "Jasne. Nie jesteśmy typową burgerownią tylko dla mięsożerców. Mamy świetne wege burgery i przekąski do piwa, które nie widziały mięsa. Każdy wyjdzie najedzony.",
  },
  {
    question: "Mogę zabrać psa?",
    answer:
      "Koniecznie! Psy są u nas mile widziane. Zawsze znajdzie się miska z wodą, a czasem nawet jakiś smaczek od obsługi (za zgodą właściciela!). Prosimy tylko, żeby piesek nie przeszkadzał innym gościom.",
  },
  {
    question: "Robicie imprezy urodzinowe?",
    answer:
      "Pewnie! Złączymy stoły, ogarniemy przekąski i zadbamy o to, żeby szkło było pełne. Napisz do nas albo wpadnij pogadać przy barze, dogadamy szczegóły.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-[#111] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3 h-3 mr-2" /> O co pytacie?
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            FAQ
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Najczęściej zadawane pytania. Jak nie ma tu Twojego, dzwoń do nas
            śmiało.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-white/10 px-6 rounded-2xl bg-white/5 data-[state=open]:bg-white/10 transition-colors"
            >
              <AccordionTrigger className="text-white hover:text-primary hover:no-underline font-display tracking-wide text-lg py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
