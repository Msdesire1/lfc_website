
const Ourpastors = () => {
  const pastors = [
    {
      image: "/pastor1.svg",
      name: "Pastor Kayode Martins",
      role: "State/Residence Pastor"
    },
    {
      image: "/pastor3.svg",
      name: "Pastor Christian Femi Ekpekhio",
      role: "Assistant Residence Pastor"
    },

     {
      image: "/pastor2.svg",
      name: "Pastor Salami Opeyemi",
      role: "Associate Pastor"
    },
  ]
  return (
    <div className="py-8 px-4 md:px-10 flex flex-col items-center gap-[40px] lg:px-20">
      <h2 className="text-[40px] font-semibold text-center text-[#000]">Our Pastors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-3 gap-6">
        {pastors.map((pastor, idx) => (
          <div key={idx}
            className="relative rounded-xl overflow-hidden shadow-lg min-h-[400px] flex flex-col pb-6 px-6 justify-end bg-cover bg-center"
            style={{ backgroundImage: `url(${pastor.image})` }}
          >
            <h3 className="text-xl font-semibold text-[#FDFDFD]">{pastor.name}</h3>
            <p className="text-[16px] font-normal text-[#FDFDFD]">{pastor.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ourpastors