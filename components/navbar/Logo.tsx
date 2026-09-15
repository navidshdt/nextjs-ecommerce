import Link from 'next/link';
import { Button } from '../ui/button';
import { VscHome } from 'react-icons/vsc';

function Logo() {
  return (
    <Button size="icon" variant={'ghost'} asChild>
      <Link href="/">
        <VscHome className="w-6 h-6" />
      </Link>
    </Button>
  );
}

export default Logo;
