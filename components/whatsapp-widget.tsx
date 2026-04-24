import { FaWhatsapp } from "react-icons/fa";

const whatsappNumber = "+923071123512";
const baseurl = "https://api.whatsapp.com/send/";

const defaultMessage =
  "Assalam o alikum! I would like to know more about CoElegance organic hair oil.";

function whatsappHref() {
  const params = new URLSearchParams({
    phone: whatsappNumber,
    text: defaultMessage,
  });
  return `${baseurl}?${params.toString()}`;
}

export default function WhatsAppWidget() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 md:bottom-6 md:right-6"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8" aria-hidden />
    </a>
  );
}
