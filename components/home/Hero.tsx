import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HeroCarousel from './HeroCarousel';

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people DREAM!
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Discover thoughtfully designed furniture and home essentials that turn
          everyday spaces into places you love. From statement seating to cozy
          bedroom pieces, every item is curated for comfort, quality, and
          timeless style — all at prices that make good design accessible.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
export default Hero;
