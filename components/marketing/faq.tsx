import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "What services does Creative Upaay offer?",
    answer:
      "We provide premium end-to-end digital services, including custom Web Design (Next.js/React), AI Agent Integration (LLMs/Chatbots), Workflow Automations (Zapier/Make/Custom APIs), scalable Web Applications, and complete System Audits.",
  },
  {
    question: "What is your average project timeline?",
    answer:
      "Timelines vary significantly based on project scope. A robust marketing website typically takes 6-8 weeks, while complex full-stack web applications or custom AI integrations can span 3-6 months from strategy to launch.",
  },
  {
    question: "How much does a typical project cost?",
    answer:
      "We build customized solutions tailored to your scalable needs. Since we engineer from scratch (no rigid templates), pricing is scoped per project based on architectural complexity, AI requirements, and design depth. We provide a transparent, detailed proposal after our strategy session.",
  },
  {
    question: "How do AI agents actually help my business?",
    answer:
      "We custom-build LLM-powered AI agents that integrate directly into your operations. They can handle advanced customer support 24/7, qualify inbound leads, automate repetitive data logic, and act as an internal knowledge base, saving your team hundreds of mundane hours every week.",
  },
  {
    question: "Do I own the code and design once the project is launched?",
    answer:
      "Yes, absolutely. Upon final payment and project completion, complete ownership of all intellectual property, including custom code, design assets, and database architecture, is transferred directly to you.",
  },
  {
    question: "Which technologies do you specialize in?",
    answer:
      "We are specialized experts in the React ecosystem (Next.js), Node.js, TypeScript, Tailwing CSS, Framer Motion, and GSAP for animations. For automations, we utilize Make, Zapier, and custom API connections. We build on highly robust, modern full-stack backends like PostgreSQL, Prisma, and serverless architectures.",
  },
  {
    question: "Can you automate my repetitive back-office tasks?",
    answer:
      "Yes, that is a core specialty. We perform a system audit to identify bottlenecks and then create complex workflow automations that connect your CRM, email, project management, and payment tools, eliminating manual data entry completely.",
  },
  {
    question: "What kind of support do you offer post-launch?",
    answer:
      "We offer customized monthly retainers for performance optimization, ongoing AI training, security updates, feature expansions, and proactive technical support to ensure your system remains scaled and secure as your business grows.",
  },
];

const FAQSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-[#0e0d09] px-6 py-24 text-white md:py-32">
      <div className="relative w-full max-w-7xl">
        <div className="mb-16 text-center md:mb-24">
          <h2 className="font-primary mb-4 text-4xl leading-tight font-black md:text-5xl lg:text-6xl">
            Frequently Asked <span className="text-zinc-500">Questions.</span>
          </h2>
          <p className="font-secondary mx-auto max-w-2xl pt-2 text-lg leading-relaxed text-zinc-400 md:text-xl">
            Everything you need to know about partnering with Creative Upaay to
            engineer your digital future. Can't find your answer? Reach out
            directly.
          </p>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <Accordion
            type="single"
            collapsible
            className="space-y-4 border-none"
          >
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group overflow-hidden rounded-2xl border border-zinc-800/50 bg-[#121212] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700/50"
              >
                <AccordionTrigger
                  className={cn(
                    "font-primary px-6 py-5 text-left text-lg leading-tight font-bold text-white transition-colors group-hover:text-white md:px-8 md:py-6 md:text-xl",
                    "data-[state=open]:pb-3",
                  )}
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="px-6 pt-1 pb-6 md:px-8 md:pb-8">
                  <div className="font-secondary text-base leading-relaxed font-medium text-zinc-400 md:text-lg">
                    {faq.answer.split(" ").map((word, wordIndex) => {
                      const normalizedWord = word
                        .toLowerCase()
                        .replace(/[.,!?;:]/g, "");
                      const monoWords = [
                        "scalability",
                        "architecture",
                        "ai",
                        "llm",
                        "api",
                        "next.js",
                        "react",
                        "workflow",
                        "automations",
                        "ip",
                      ];

                      if (monoWords.includes(normalizedWord)) {
                        return (
                          <span
                            key={wordIndex}
                            className="font-tertiary ml-1 text-sm font-bold tracking-widest text-zinc-100 uppercase"
                          >
                            {word}{" "}
                          </span>
                        );
                      }
                      return word + " ";
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="relative z-10 mt-20 text-center md:mt-28">
          <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800/50 bg-white p-8 text-[#0e0d09] shadow-2xl md:p-12">
            <h3 className="font-primary mb-4 text-2xl font-black text-[#0e0d09] md:text-3xl">
              Still have specific questions?
            </h3>
            <p className="font-secondary mx-auto mb-8 max-w-lg text-base font-medium text-[#0e0d09]/80 md:text-lg">
              We're here to engineer solutions tailored to you. Reach out to our
              strategy team and we'll connect as soon as possible.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=eds@cdgi.edu.in"
                target="blank"
                className="font-secondary inline-flex items-center justify-center rounded-full bg-[#0e0d09] px-8 py-3 text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#0e0d09]/90 active:scale-[0.98]"
              >
                Strategy Session ↗
              </a>
              <a
                href="https://www.instagram.com/echelondevsociety"
                target="_blank"
                rel="noopener noreferrer"
                className="font-secondary inline-flex items-center justify-center rounded-full border-2 border-[#0e0d09] px-8 py-3 text-lg font-bold text-[#0e0d09] transition-all hover:scale-[1.02] hover:bg-[#0e0d09] hover:text-white active:scale-[0.98]"
              >
                View Works ↗
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 flex h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.03] blur-[100px]">
          <div className="glow-orb h-full w-full rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
