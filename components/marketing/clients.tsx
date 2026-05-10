"use client";

type Client = {
  name: string;
  logoSrc: string;
  url: string;
};

const CLIENTS: Client[] = [
  {
    name: "IDA International",
    logoSrc: "/sponsors/one.png",
    url: "#",
  },
  {
    name: "HotWax Systems",
    logoSrc: "/sponsors/two.png",
    url: "#",
  },
  {
    name: "Shekunj Foundation",
    logoSrc: "/sponsors/three.png",
    url: "#",
  },
  {
    name: "HDFC Bank",
    logoSrc: "/sponsors/four.png",
    url: "#",
  },
];

export default function ClientsSection() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-[#0e0d09] px-6 py-24 text-white md:py-32">
      <div className="w-full max-w-7xl">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="font-primary mb-4 text-4xl leading-tight font-black md:text-5xl lg:text-6xl">
            Brands We've <span className="text-zinc-500">Elevated.</span>
          </h2>
          <p className="font-secondary mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl">
            We are proud to collaborate with forward-thinking companies to build
            scalable, intelligent digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {CLIENTS.map((client) => (
            <a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={client.name}
              className="group relative flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/50 bg-[#FCEAE4] p-8 transition-all duration-500 hover:-translate-y-1 md:h-40"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_55%)]" />
              </div>

              <img
                src={client.logoSrc}
                alt={`${client.name} logo`}
                className="max-h-[60%] w-auto max-w-[80%] object-contain filter transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:filter-none"
                loading="lazy"
              />

              <div className="pointer-events-none absolute right-0 bottom-3 left-0 flex justify-center">
                <span className="font-tertiary rounded-full border border-zinc-800 bg-black/80 px-3 py-1 text-[0.65rem] tracking-widest text-zinc-300 uppercase opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  {client.name}
                </span>
              </div>
            </a>
          ))}

          {CLIENTS.length % 4 !== 0 && (
            <div className="font-secondary hidden h-40 items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/10 text-sm font-medium text-zinc-600 lg:flex">
              More partnerships coming soon
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
