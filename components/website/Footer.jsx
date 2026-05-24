import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="relative lg:mt-32">
      {/* ================= CTA SECTION ================= */}
      {/* <div className="absolute left-1/2 top-0 z-20 lg:w-[92%] w-full max-w-6xl -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-3xl">

          <Image
            src="/cta.svg"
            alt="cta image"
            width={1400}
            height={500}
            className="lg:w-full object-cover"
          />
          <div className="absolute inset-0 top-3 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-3xl text-[12px] font-semibold leading-relaxed text-white md:text-[18px]">
              Give, and it will be given to you. A good measure, pressed down,
              shaken together and running over, will be poured into your lap.
              <br />
              <span className="lg:text-[16px] text-[14px]"> Luke 6:38</span>
            </h2>

            <Link
              href={"/website/giveonline"}
              className="mt-8 rounded-[12px] bg-[#EC3237] px-8 py-3 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Give Now
            </Link>
          </div>
        </div>
      </div> */}


<div className="absolute left-1/2 top-0 z-20 w-[95%] max-w-6xl -translate-x-1/2 -translate-y-1/2">
  <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
    {/* Background Image */}
    <Image
      src="/cta.svg"
      alt="cta image"
      width={1400}
      height={500}
      className="h-[180px] w-full object-cover sm:h-[220px] md:h-[260px] lg:h-auto"
    />

    {/* Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
      <h2 className="max-w-3xl text-[11px] font-semibold leading-relaxed text-white sm:text-[14px] md:text-[18px]">
        Give, and it will be given to you. A good measure, pressed down,
        shaken together and running over, will be poured into your lap.
        <br />
        <span className="text-[12px] sm:text-[13px] md:text-[16px]">
          Luke 6:38
        </span>
      </h2>

      <Link
        href={"/website/giveonline"}
        className="mt-4 rounded-[10px] bg-[#EC3237] px-5 py-2 text-xs font-medium text-white transition hover:bg-red-700 sm:mt-6 sm:px-6 sm:py-3 sm:text-sm md:mt-8 md:px-8"
      >
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
              Winners Chapel New Jerusalem is a Faith-Based Church, An Assembly
              Of God’s People Based In Ilorin, Gaa Imam. Join Us Every Sunday
              And Wednesday For Worship.
            </p>
            <div>
              <h3 className="mt-6 mb-3 text-[18px] font-semibold uppercase text-[#D1D1D1]">
                {" "}
                Follow Us
              </h3>
              <div className="flex items-center flex-row gap-4">
                <a
                  href="https://www.facebook.com/share/1AcddDGdtN"
                  className="transition hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z" />
                      <path
                        stroke-linecap="round"
                        d="M16.927 8.026h-2.945a1.9 1.9 0 0 0-1.9 1.886l-.086 11.515m-1.914-7.425h4.803"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/lfcilorin?igsh=ejAzdGp0dHB2b3Z2"
                  className="transition hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="M3 12c0-4.243 0-6.364 1.318-7.682S7.758 3 12 3s6.364 0 7.682 1.318S21 7.758 21 12s0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12" />
                      <path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0m1.375-5.25h-.125m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0" />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@lfcilorin"
                  className="transition hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 20.5c1.81 0 3.545-.179 5.153-.507c2.01-.41 3.014-.614 3.93-1.792c.917-1.179.917-2.532.917-5.238v-1.926c0-2.706 0-4.06-.917-5.238c-.916-1.178-1.92-1.383-3.93-1.792A26 26 0 0 0 12 3.5c-1.81 0-3.545.179-5.153.507c-2.01.41-3.014.614-3.93 1.792C2 6.978 2 8.331 2 11.037v1.926c0 2.706 0 4.06.917 5.238c.916 1.178 1.92 1.383 3.93 1.792c1.608.328 3.343.507 5.153.507Z" />
                      <path
                        stroke-linejoin="round"
                        d="M15.962 12.313c-.148.606-.938 1.04-2.517 1.911c-1.718.947-2.577 1.42-3.272 1.237a1.7 1.7 0 0 1-.635-.317C9 14.709 9 13.806 9 12s0-2.709.538-3.144c.182-.147.4-.256.635-.317c.695-.183 1.554.29 3.272 1.237c1.58.87 2.369 1.305 2.517 1.911c.05.206.05.42 0 .626Z"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@winnerchapelnewjerusalem?_r=1&_t=ZS-9408MXlHQzR"
                  className="transition hover:text-red-500"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14">
  <path d="M0 0h14v14H0z" fill="none" />
  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5.671 6.655a1.99 1.99 0 1 0 1.99 1.99v-5.28c.308 1.321 1.195 2.242 2.658 2.242" />
    <path d="M.96 10.269a3.13 3.13 0 0 0 2.753 2.76c1.07.119 2.167.221 3.287.221s2.218-.102 3.287-.222a3.13 3.13 0 0 0 2.753-2.76c.114-1.063.21-2.155.21-3.268s-.096-2.205-.21-3.269a3.13 3.13 0 0 0-2.753-2.76C9.217.853 8.12.75 7 .75S4.782.852 3.713.972A3.13 3.13 0 0 0 .96 3.732C.846 4.794.75 5.886.75 7s.096 2.205.21 3.269" />
  </g>
</svg>
                </a>
                <a
                  href="https://t.me/+LNIVt-0iDflkMzg0"
                  className="transition hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m11.985 15.408l3.242 3.686c1.2 1.365 1.801 2.048 2.43 1.881c.628-.166.844-1.064 1.275-2.861l2.39-9.968c.665-2.768.997-4.151.259-4.834s-2.017-.175-4.575.84L5.14 8.865c-2.046.813-3.069 1.219-3.134 1.917a1 1 0 0 0 0 .214c.063.699 1.084 1.108 3.128 1.927c.925.371 1.388.557 1.72.912q.056.06.108.124c.306.38.436.88.697 1.876l.489 1.867c.253.97.38 1.456.713 1.522s.622-.336 1.201-1.141zm0 0l-.317-.33c-.362-.378-.543-.566-.543-.8s.18-.423.543-.8l3.573-3.724"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Church Links */}
          <div>
            <h3 className="mb-7 text-[16px] font-semibold text-white">
              Church Links
            </h3>

            <ul className="space-y-5 text-[12px] text-[#D1D1D1]">
              <li>
                <a
                  href="/website/wsflocation"
                  className="transition hover:text-red-500"
                >
                  WSF Finder
                </a>
              </li>

              <li>
                <a
                  href="/website/books"
                  className="transition hover:text-red-500"
                >
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
              <li>(First Saturday of the month) - 7:00am</li>
            </ul>
          </div>

          {/* Weekly Service */}
          <div>
            <h3 className="mb-7 text-[16px] font-semibold text-white">
              Weekly Service
            </h3>

            <ul className="space-y-5 text-[12px] text-[#D1D1D1]">
              <li> (Every Sunday) - 7:30am</li>
              <li> (First day of the month) - 6:30am</li>
              <li>(Every Wednesday) - 5:00pm</li>
              <li> (every Saturday ) - 5:00pm</li>
              <li> (Monday-Saturday) - 6:30am</li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="mb-7 text-[16px] font-semibold text-white">
              Ministries
            </h3>

            <ul className="space-y-5 text-[12px] text-[#D1D1D1]">
              <li>
                <a href="#" className="transition hover:text-red-500">
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/website/about"
                  className="transition hover:text-red-500"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/website/ministries"
                  className="transition hover:text-red-500"
                >
                  Ministries
                </a>
              </li>

              <li>
                <a
                  href="/website/wofbi"
                  className="transition hover:text-red-500"
                >
                  WOFBI
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-red-500">
                  Education
                </a>
              </li>

              <li>
                <a
                  href="/website/contact"
                  className="transition hover:text-red-500"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-7 text-[16px] font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-5 text-[12px] text-[#D1D1D1]">
              <li>
                <a
                  href="/website/teens"
                  className="transition hover:text-red-500"
                >
                  Teens Church
                </a>
              </li>
              <li>
                <a
                  href="/website/teens"
                  className="transition hover:text-red-500"
                >
                  David Oyedepo Ministries
                </a>
              </li>
              <li>
                <a
                  href="/website/teens"
                  className="transition hover:text-red-500"
                >
                  Faith Oyedepo Ministries
                </a>
              </li>
              <li>
                <a
                  href="https://media.faithtabernacle.org.ng"
                  className="transition hover:text-red-500"
                >
                  DOMI Radio
                </a>
              </li>
              <li>
                <a
                  href="https://lmu.edu.ng"
                  className="transition hover:text-red-500"
                >
                  Landmark University
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-[#FFFFFF1A] pt-7 text-center">
          <p className="text-[13px] leading-7 text-[#BDBDBD]">
            © 2026 LFC New Jerusalem, Ilorin Church. All Right Reserved. Powered
            by Protocol Unit |
            <Link
              href="https://dev-desire-n2vl.vercel.app"
              target="_blank"
              className="ml-1 font-medium text-white transition hover:text-red-500"
            >
              Created by Desire
            </Link>
          </p>
        </div>
      </footer>
    </section>
  );
}
