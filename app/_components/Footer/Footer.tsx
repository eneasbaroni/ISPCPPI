import Link from "next/link";
import Magnet from "../Magnet/Magnet";
import Banner from "./Banner/Banner";

const links = [
  {
    href: "https://wa.me/+5493516000000",
    alt: "whatsapp",
    image: "whatsapp_icon.svg",
  },
  {
    href: "https://www.instagram.com/picante.serigrafia/",
    alt: "instagram",
    image: "instagram_icon2.svg",
  },
  {
    href: "https://www.facebook.com/picante.serigrafia/",
    alt: "facebook",
    image: "facebook_icon.svg",
  },
  {
    // TODO, change to a real mail
    href: "mailto:mail@gmail.com",
    alt: "mail",
    image: "mailIcon.svg",
  },
];

const Footer = () => {
  return (
    <>
      <footer
        id="contact"
        className="w-full min-h-screen mobile:min-h-min bg-white flex flex-col items-center border-none outline outline-main"
      >
        <div className="w-full h-[50vh] min-h-87.5mobile:min-h-0 mobile:h-auto flex mobile:flex-col items-center gap-0 justify-center divide-x divide-main mobile:divide-y mobile:divide-x-0">
          <div className="flex-1 h-full ">
            <a
              href="https://g.page/picante-serigrafia?share"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/Images/contact/mapa4.png"
                alt="mapa"
                className="w-full h-full object-cover"
              />
              {/* <Image src='/Images/contact/mapa.png' height={600} width={1000} alt='mapa' /> */}
            </a>
          </div>
          <div className="flex-1 mobile:w-full h-full flex flex-col items-center justify-between   p-4">
            <p className="w-full font-anton text-4xl mobile:text-2xl leading-[2.7rem]">
              VISITÁ NUESTRO{" "}
              <span
                className="font-anton text-4xl mobile:text-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                style={{
                  WebkitTextStroke: "1px black",
                  WebkitTextFillColor: "white",
                }}
              >
                TALLER
              </span>{" "}
              CON CITA PREVIA EN
              <br />
              BUCHARDO 1531, CÓRDOBA AR
            </p>

            <div className="w-full flex flex-col [&>a]:font-anton [&>a]:text-3xl [&>a]:mobile:text-xl">
              <Link href="https://wa.me/+5493516000000">+54 9 351-6558094</Link>
              <Link href="https://www.instagram.com/picante.serigrafia/">
                @picante.serigrafia
              </Link>
              {/* TODO - Change to a real mail */}
              <Link href="mailto:mail@gmail.com">mail@gmail.com</Link>
              <Link href="https://eneasbaroni.com.ar/">
                Diseño y Desarrollo x ENEAS
              </Link>
            </div>
          </div>
          <div className="flex-1 h-full mobile:w-full flex items-center justify-around">
            {links.map(({ href, alt, image }) => (
              <Magnet
                classN="w-20 h-20 tablet:w-[65px] tablet:h-[65px] mobile:w-16 mobile:h-16 cursor-pointer"
                area="0.5rem"
                key={alt}
              >
                <Link href={href} className="iconsContainer">
                  <img
                    src={`/Images/${image}`}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </Magnet>
            ))}
          </div>
        </div>
        <Banner />
      </footer>
    </>
  );
};

export default Footer;
