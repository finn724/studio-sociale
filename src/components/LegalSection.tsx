export default function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display mb-4 text-2xl sm:text-3xl">{title}</h2>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-light sm:text-base">
        {children}
      </div>
    </section>
  );
}
