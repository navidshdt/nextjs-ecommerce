function AboutPage() {
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        We love
        <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">
          16 Store
        </span>
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        At 16 Store, we believe great design should feel personal. We hand-pick
        furniture and home goods from trusted makers who share our obsession
        with craftsmanship and detail. Whether you&apos;re furnishing your first
        apartment or refreshing a well-loved home, we&apos;re here to help you
        find pieces that fit your life — and last for years to come.
      </p>
    </section>
  );
}
export default AboutPage;
