export const OurProgrammes = () => {
  const programmes = [
    { image: '/p1.jpg', title: 'Undergraduate', subtitle: 'Programmes', width: 461, height: 638 },
    { image: '/p2.jpg', title: 'Postgraduate', subtitle: 'Programmes', width: 461, height: 638 },
    { image: '/p3.jpg', title: 'Ph.D.', subtitle: 'Programmes', width: 461, height: 638 },
    { image: '/p4.jpg', title: 'Diplomas &', subtitle: 'Certifications', width: 461, height: 644 },
  ];



  return (
    <section className="bg-[#f6f7f0] py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-4">
          OUR PROGRAMMES
        </h2>
        <div className="mx-auto" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
      </div>

      {/* Programme Cards */}
      <div className="flex justify-center gap-[10px]" style={{ padding: '0 23px' }}>
        {programmes.map((programme, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer group"
            style={{
              width: `${programme.width}px`,
              height: `${programme.height}px`,
            }}
          >
            <img
              src={programme.image}
              alt={programme.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-6 left-6 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
                {programme.title}
              </h3>
              <p className="text-xl lg:text-2xl font-bold">
                {programme.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Courses Button */}
      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#c3fd7a] text-[#21313c] rounded-full font-semibold text-sm hover:bg-[#b3ed6a] transition-colors">
          View All Courses
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Text Section - Hero style layout */}
      <div className="mt-16 md:mt-24 px-6 md:px-12 lg:px-24">
        {/* Big Text - Left aligned */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#21313c] leading-tight lg:w-1/2">
            Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque.
          </h3>
        </div>

        {/* Small Text - Right aligned */}
        <div className="flex justify-end">
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed lg:w-1/2">
            Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque pharetra facilisi amet. Eu ut sem a id nec nunc ante nunc. Lorem ipsum dolor sit amet consectetur. Morbi leo dictum ut cursus posuere integer sed massa. Adipiscing scelerisque sed massa sed nisl. Neque donec molestie faucibus integer est tincidunt donec nunc.
          </p>
        </div>
      </div>

      {/* Partners Section */}
      <div className="mt-16 md:mt-24" style={{ padding: '0 23px' }}>
        {/* First Row - 2 boxes left aligned */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Lorem ipsum</p>
          <div className="flex">
            {/* Middlesex */}
            <div
              className="border border-gray-300 flex items-center justify-center"
              style={{ width: '472px', height: '284px' }}
            >
              <img
                src="/mid.png"
                alt="Middlesex University"
                className="max-h-28 object-contain"
              />
            </div>
            {/* King's College */}
            <div
              className="border border-l-0 border-gray-300 flex items-center justify-center"
              style={{ width: '472px', height: '284px' }}
            >
              <img
                src="/king.png"
                alt="King's College London"
                className="max-h-28 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom boxes - 6 boxes (625x240) */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-2">Lorem ipsum</p>

          {/* Second Row - 3 boxes (NUS, CII, FICCI) */}
          <div className="flex">
            <div
              className="border border-gray-300 flex items-center justify-center"
              style={{ width: '625px', height: '240px' }}
            >
              <img
                src="/nus.png"
                alt="NUS"
                className="max-h-24 object-contain"
              />
            </div>
            <div
              className="border border-l-0 border-gray-300 flex items-center justify-center"
              style={{ width: '625px', height: '240px' }}
            >
              <img
                src="/c11.png"
                alt="CII"
                className="max-h-24 object-contain"
              />
            </div>
            <div
              className="border border-l-0 border-gray-300 flex items-center justify-center"
              style={{ width: '625px', height: '240px' }}
            >
              <img
                src="/ficci.png"
                alt="FICCI"
                className="max-h-24 object-contain"
              />
            </div>
          </div>

          {/* Third Row - Grant Thornton + empty boxes */}
          <div className="flex">
            <div
              className="border border-t-0 border-gray-300 flex items-center justify-center"
              style={{ width: '625px', height: '240px' }}
            >
              <img
                src="/gt.png"
                alt="Grant Thornton"
                className="max-h-24 object-contain"
              />
            </div>
            <div
              className="border border-t-0 border-l-0 border-gray-300"
              style={{ width: '625px', height: '240px' }}
            >
              {/* Empty box */}
            </div>
            <div
              className="border border-t-0 border-l-0 border-gray-300"
              style={{ width: '625px', height: '240px' }}
            >
              {/* Empty box */}
            </div>
          </div>
        </div>
      </div>

      {/* Three Image Cards Section */}
      <div className="mt-16 md:mt-24">
        <div className="flex">
          {/* First card - l */}
          <div
            className="overflow-hidden w-1/3"
            style={{
              maxHeight: '739px',
              marginTop: 'clamp(0px, 1.4vw, 27px)',
            }}
          >
            <img
              src="/l.jpg"
              alt="Image 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Second card - ll */}
          <div
            className="overflow-hidden w-1/3"
            style={{
              maxHeight: '661px',
              marginTop: 'clamp(0px, 5.5vw, 105px)',
            }}
          >
            <img
              src="/ll.jpg"
              alt="Image 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Third card - lll */}
          <div
            className="overflow-hidden w-1/3"
            style={{
              maxHeight: '766px',
            }}
          >
            <img
              src="/lll.jpg"
              alt="Image 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
