import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="relative mt-32">
      {/* ================= CTA SECTION ================= */}
      <div className="absolute left-1/2 top-0 z-20 w-[92%] max-w-6xl -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Image */}
          <Image
            src="/cta.svg" // your image
            alt="cta image"
            width={1400}
            height={500}
            className="w-full object-cover"
          />



          {/* Content */}
          <div className="absolute inset-0 top-3 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-3xl text-[18px] font-semibold leading-relaxed text-white md:text-[20px]">
              Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.
              <br />
              <span className="lg:text-[32px] text-[16px]"> Luke 6:38</span>
            </h2>

            <Link href={"/website/giveonline"} className="mt-8 rounded-[12px] bg-[#EC3237] px-8 py-3 text-sm font-medium text-white transition hover:bg-red-700">
              Give Now
            </Link>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-[#0A0A0A] px-6 pb-10 pt-52 text-white md:px-14 lg:px-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo + About */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-start gap-3">
              <Image
                src="/footerlo.svg"
                alt="logo"
                width={50}
                height={48}
                className="object-contain"
              />

              <h2 className="text-[24px] font-semibold uppercase leading-8">
                Living Faith New
                <br />
                Jerusalem, Ilorin
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#D1D1D1]">
              Winners Chapel New Jerusalem is a Faith-Based Church, An
              Assembly Of God’s People Based In Ilorin, Gaa Imam. Join Us
              Every Sunday And Wednesday For Worship.
            </p>
          </div>

          {/* Church Links */}
          <div>
            <h3 className="mb-7 text-xl font-semibold text-white">
              Church Links
            </h3>

            <ul className="space-y-5 text-sm text-[#D1D1D1]">
              <li>
                <a href="#" className="transition hover:text-red-500">
                  WSF Finder
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Resources
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Bookshop
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Webmail
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Vacancies
                </a>
              </li>
            </ul>
          </div>

          {/* Weekly Service */}
          <div>
            <h3 className="mb-7 text-xl font-semibold text-white">
              Weekly Service
            </h3>

            <ul className="space-y-5 text-sm text-[#D1D1D1]">
              <li>Everyday (6-7AM)</li>
              <li>Mondays (6:00PM)</li>
              <li>Wednesday (5:00 PM)</li>
              <li>Sundays (7AM)</li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="mb-7 text-xl font-semibold text-white">
              Ministries
            </h3>

            <ul className="space-y-5 text-sm text-[#D1D1D1]">
              <li>
                <a href="#" className="transition hover:text-red-500">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Ministries
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  WOFBI
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Education
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-7 text-xl font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-5 text-sm text-[#D1D1D1]">
              <li>Teens Church</li>
              <li>WOFBI</li>
              <li>David Oyedepo Ministries</li>
              <li>Faith Oyedepo Ministries</li>
              <li>DOMI Radio</li>
              <li>Landmark University</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-[#FFFFFF1A] pt-7 text-center">
          <p className="text-sm leading-7 text-[#BDBDBD]">
            © 2026 LFC New Jerusalem, Ilorin Church. All Right Reserved.
            Powered by Protocol Unit |
            <Link
              href="https://dev-desire-n2vl.vercel.app"
              target="_blank"
              className="ml-1 font-medium text-white transition hover:text-red-500"
            >
              Created by Dev Desire
            </Link>
          </p>
        </div>
      </footer>
    </section>
  );
}