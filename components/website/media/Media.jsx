import React from "react";

const socialLinks = {
  facebook: "https://www.facebook.com/share/1AcddDGdtN",
  tiktok: "https://www.tiktok.com/@winnerchapelnewjerusalem?_r=1&_t=ZS-9408MXlHQzR",
  youtube: "https://www.youtube.com/@lfcilorin",
  instagram: "https://www.instagram.com/lfcilorin?igsh=ejAzdGp0dHB2b3Z2",
};

const videos = [
  {
     id: "gg4bMNGq9zA",
    title: "Bible-Focused Worship | LFC New Jerusalem",
    description: "A fresh sermon from our latest Sunday service on faith, purpose and living in God’s grace.",
  },
  {
  id: "WpE-a00PqIw",
    title: "Faith & Church Life Highlights",
    description: "A collection of worship highlights and ministry moments from LFC New Jerusalem.",
  },
  {
    id: "EmOmFl4cxY4",
    title: "Sunday Service Replay",
    description: "Watch the full Sunday service replay with worship and teaching.",
  },

  {
    id: "WPb3QReQlm0",
    title: "Sunday Service Replay",
    description: "Watch the full Sunday service replay with worship and teaching.",
  },
];

const highlights = [
  {
    title: "Worship Highlights",
    description: "Relive powerful worship moments from our official Facebook and YouTube channels.",
  },
  {
    title: "Sermon Replays",
    description: "Watch the latest preaching series anytime from our media library.",
  },
  {
    title: "Church Life",
    description: "See what’s happening across our services, youth gatherings and community outreach.",
  },
];

export default function Media() {
  return (
    <section className="relative overflow-hidden py-20">

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center pt-10">
          <div className="space-y-6">

            <h1 className="lg:text-[30px] text-[14px]  font-semibold  text-[#141414] ">
              Stay connected with worship<br/> highlights, sermons and church life.
            </h1>
            <p className="max-w-2xl text-[14px] leading-8 text-[#4c473f]">
              Follow our official channels for live services, featured recordings and more. We bring the heart of LFC New Jerusalem online with faith-filled teaching, worship and community stories.
            </p>
            <div className="grid gap-3 sm:flex sm:items-center sm:gap-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#4267B2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4267B233] transition hover:-translate-y-0.5"
              >
                Follow on Facebook
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-[12px] border border-[#EC3237] bg-[#EC3237] px-6 py-3 text-sm font-semibold text-white transition"
              >
                Watch on YouTube
              </a>
            </div>
            <p className="max-w-xl text-sm text-[#5c5348]">
              For worship highlights and live updates, visit our Facebook page and join the worship family across TikTok, Instagram and WhatsApp.
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-[#c9c5bf] bg-white ">
            <div className="relative overflow-hidden bg-[#0f0b10]">
              <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_60%)]" />
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${videos[0].id}`}
                  title={videos[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="space-y-2 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B1822B]">Featured sermon</p>
              <h2 className="text-[16px] font-semibold text-[#141414]">{videos[0].title}</h2>
              <p className="text-sm leading-6 text-[#5f5346]">{videos[0].description}</p>
            </div>
          </div>
        </div>

        {videos.length > 1 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="text-sm uppercase tracking-[0.3em] text-[#8A5C29]">More videos</span>
              <p className="text-sm text-[#5c5348]">Additional worship and sermon recordings from our channel.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {videos.slice(1).map((video) => (
                <div key={video.id} className="rounded-[28px] border border-[#c9c5bf] bg-white p-4 shadow-xl shadow-[#51422c0d]">
                  <div className="overflow-hidden rounded-3xl bg-black">
                    <iframe
                      className="aspect-video w-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#181414]">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5e5648]">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-[#c9c5bf] bg-white p-6 shadow-xl shadow-[#51422c0d] transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-[#181414]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5e5648]">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          <div className="rounded-4xl border border-[#c9c5bf] bg-[#3b3f52] p-8 text-white shadow-2xl shadow-[#0b090f40]">
            <p className="text-sm uppercase tracking-[0.3em] text-white">Live media</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight">Experience worship in real time</h3>
            <p className="mt-4 text-sm leading-7 text-white">
              Watch our services, special worship highlights and church gatherings live or on replay. The best of LFC New Jerusalem is available online for every member and visitor.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[#000]">Sunday Service</p>
                <p className="mt-2 text-lg font-semibold  text-[#000]">7:30 AM -9:30PM</p>
              </div>
              <div className="rounded-3xl bg-white p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[#000]">Wednesday Service</p>
                <p className="mt-2 text-lg font-semibold text-[#000]">5:00 PM - 6:30PM</p>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-[#c9c5bf] bg-white p-8 shadow-xl shadow-[#51422c10]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#000]">Featured update</p>
            <h3 className="mt-4 text-2xl font-semibold text-[#141414]">Worship highlights on Facebook</h3>
            <p className="mt-4 text-sm leading-7 text-[#000]">
              Our worship highlight clips are posted first on Facebook. Click through to watch the latest praise, music and messages from LFC New Jerusalem.
            </p>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-[12px] bg-[#4267B2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3757a3]"
            >
              View Facebook highlights
            </a>
          </div>
        </div>

        <div className="mt-16 rounded-[32px] border border-[#c9c5bf] bg-white p-8 ">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase  text-[#141414]">Official channels</p>
              <h4 className="mt-3 text-[16px] font-semibold text-[#141414]">Connect with us on TikTok, Facebook, YouTube and Instagram</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(socialLinks).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[12px] border border-[#c9c5bf] bg-[#EC3237]  px-4 py-2 text-sm font-semibold text-[#fbf8f7] transition"
                >
                  {label === "whatsapp" ? "WhatsApp" : label.charAt(0).toUpperCase() + label.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}