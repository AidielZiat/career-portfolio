
interface LogoEntry {
  name: string;
  logoSrc?: string;
}

const logos: LogoEntry[] = [
  { name: "Deloitte" },
  { name: "PwC" },
];

const LogoStrip = () => (
  <section className="py-12 bg-muted border-y border-border">
    <div className="section-inner">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        Where I've Worked
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {logos.map((logo) => (
          <div key={logo.name} className="flex items-center justify-center h-10">
            {logo.logoSrc ? (
              <img
                src={logo.logoSrc}
                alt={logo.name}
                className="h-full w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
              />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground tracking-wide">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LogoStrip;
