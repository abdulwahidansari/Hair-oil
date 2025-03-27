import Image from "next/image";
import Link from "next/link";

export default function Logo1() {
  return (
    <Link href="/">
      <Image
        src="/images/logo1.png" 
        alt=" Logo" 
        width={150}
        height={40}
        priority
      />
    </Link>
  );
} 