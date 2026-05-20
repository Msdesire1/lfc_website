"use client";

export default function ServiceMarquee() {
  const services = [
     "Covenant Hour of Prayer (Monday-Saturday) - 6:00am - 7:00am",
    "Service (Every Sunday) - 7:30am - 9:30am ",
      "Communion Service (Every Wednesday) - 5:00pm - 6:30pm",
    "Winners Satellite Fellowship (Every Saturday) - 5:00pm - 6:00pm",
    "Trumpet Service (First day of the month) - 6:00am - 7:00am",
    "Leadership Empowerment Summit (First Saturday of the month) - 7:00am",
  ];

  return (
    <div className="relative overflow-hidden bg-[#EC3237] py-4 border-y border-white/10">
      <div className="flex w-max animate-marquee gap-10">
        {[...services, ...services].map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="h-2 w-2 rounded-full bg-[#605a5a]" />
            <p className="text-[20px]  text-white font-medium">
              {service}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}