import { motion } from 'framer-motion';
import { useState } from 'react';

const eventsData = [
  {
    id: 1,
    date: '17 September 2025',
    title: 'Pinning Ceremony',
    organization: 'Jagran Lakecity University',
    location: 'Jagran Lakecity University SEH, Bhopal',
    description: 'Pinning Ceremony Pinning of the new student council members 2025',
    venue: 'A-block Auditorium',
  },
  {
    id: 2,
    date: '12 September 2025',
    title: 'Inter School Debate Competition',
    organization: 'Jagran Lakecity University',
    location: 'Jagran Lakecity University SEH, Bhopal',
    description: 'Inter School Debate Competition MUN & Debating society presents a platform for young orators.',
    venue: '',
  },
  {
    id: 3,
    date: '22 July 2025',
    title: 'Ignited Mind Awards 2025',
    organization: 'Jagran Lakecity University',
    location: 'Jagran Lakecity University SEH, Bhopal',
    description: 'A ceremony to recognize and celebrate outstanding achievements',
    venue: 'Football Ground',
  },
];

const Events = () => {
  const [keyword, setKeyword] = useState('');
  const [year, setYear] = useState('-Any-');
  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Split Layout */}
      <div className="w-screen bg-[#f6f7f0] m-0 p-0">
        <div className="relative w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Side - Decorative Shapes */}
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
            {/* Circle 1 - Top Center */}
            <div
              className="absolute bg-[#d1d1d1]"
              style={{
                width: '312px',
                height: '312px',
                top: '-93px',
                left: '406px',
                borderRadius: '11000px',
              }}
            />

            {/* Circle 2 - Middle Right */}
            <div
              className="absolute bg-[#d1d1d1]"
              style={{
                width: '312px',
                height: '312px',
                top: '219px',
                left: '403px',
                borderRadius: '11000px',
              }}
            />

            {/* Circle 3 - Middle Center */}
            <div
              className="absolute bg-[#d1d1d1]"
              style={{
                width: '312px',
                height: '312px',
                top: '219px',
                left: '91px',
                borderRadius: '11000px',
              }}
            />

            {/* Circle 4 - Middle Left (partially cut off) */}
            <div
              className="absolute bg-[#d1d1d1]"
              style={{
                width: '312px',
                height: '312px',
                top: '219px',
                left: '-221px',
                borderRadius: '11000px',
              }}
            />

            {/* Circle 5 - Bottom Center */}
            <div
              className="absolute bg-[#d1d1d1]"
              style={{
                width: '312px',
                height: '312px',
                top: '531px',
                left: '91px',
                borderRadius: '11000px',
              }}
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="relative w-full lg:w-1/2 flex items-center px-8 md:px-12 lg:px-16 py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#21313c] mb-6">
                Events
              </h1>
              <p className="text-lg md:text-xl text-[#21313c] leading-relaxed">
                Discover academic, cultural, and student-led events that bring the JLU campus together and create meaningful experiences beyond the classroom.
              </p>
            </motion.div>
          </div>
        </div>
        </div>
      </div>

      {/* Latest Past Events Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '96px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
            marginTop: '64px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-10">
            Latest Past Events
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
            <div className="flex-1">
              <label className="block text-sm text-[#21313c] mb-1">Keyword</label>
              <input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border-b border-[#21313c] bg-transparent py-2 text-[#21313c] placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-[#21313c] mb-1">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border-b border-[#21313c] bg-transparent py-2 text-[#21313c] focus:outline-none appearance-none"
              >
                <option value="-Any-">-Any-</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="text-[#21313c] underline font-medium hover:no-underline">
                Apply
              </button>
            </div>
          </div>

          {/* Events List */}
          <div className="divide-y divide-gray-200">
            {eventsData.map((event) => (
              <div key={event.id} className="py-10">
                <div className="flex flex-col lg:flex-row lg:gap-16">
                  {/* Left - Date and Title */}
                  <div className="lg:w-2/5 mb-6 lg:mb-0">
                    <p className="text-base text-[#21313c] mb-2">{event.date}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#21313c]">
                      {event.title}
                    </h3>
                  </div>

                  {/* Right - Details */}
                  <div className="lg:w-3/5">
                    <p className="text-sm text-[#21313c] mb-3">
                      <span className="font-bold">{event.organization}</span>{' '}
                      {event.location}
                    </p>
                    <p className="text-base text-[#21313c] mb-1">
                      {event.description}
                    </p>
                    {event.venue && (
                      <p className="text-base text-[#21313c] mb-4">
                        Venue: {event.venue}
                      </p>
                    )}
                    <a
                      href="#"
                      className="inline-block text-[#21313c] underline font-medium hover:no-underline mt-4"
                    >
                      Explore Event
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Life & Signature Events Section */}
      <div className="w-full bg-[#d9d9d9]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            minHeight: '1218px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Side - Staggered Cards */}
            <div className="lg:w-1/2 flex gap-6">
              {/* First Column */}
              <div className="flex flex-col gap-6">
                <div
                  className="bg-white p-4"
                  style={{ width: '270px', height: '330px' }}
                >
                  <h3 className="text-lg font-bold text-[#21313c] underline">
                    Academic & Professional Exposure
                  </h3>
                </div>
                <div
                  className="bg-white p-4"
                  style={{ width: '270px', height: '330px' }}
                >
                  <h3 className="text-lg font-bold text-[#21313c]">
                    Community & Culture
                  </h3>
                </div>
                <div
                  className="bg-white p-4"
                  style={{ width: '270px', height: '330px' }}
                >
                  <h3 className="text-lg font-bold text-[#21313c]">
                    Industry & Global Engagement
                  </h3>
                </div>
              </div>

              {/* Second Column - Offset */}
              <div className="flex flex-col gap-6 mt-40">
                <div
                  className="bg-white p-4"
                  style={{ width: '270px', height: '330px' }}
                >
                  <h3 className="text-lg font-bold text-[#21313c]">
                    Student-Led Initiatives
                  </h3>
                </div>
                <div
                  className="bg-white p-4"
                  style={{ width: '270px', height: '330px' }}
                >
                  <h3 className="text-lg font-bold text-[#21313c]">
                    Leadership & Personal Growth
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="lg:w-1/2 flex items-center">
              <div className="text-center lg:text-center">
                <p className="text-base font-medium text-[#21313c] mb-4">
                  Campus Life & Signature Events
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-6">
                  Experiences that go beyond classrooms
                </h2>
                <p className="text-base text-[#21313c] leading-relaxed mb-8 max-w-lg mx-auto">
                  At Jagran Lakecity University, events are an integral part of campus life. From academic conferences and cultural showcases to leadership forums and student-led initiatives, every event is designed to encourage participation, dialogue, and real-world exposure.
                </p>
                <button className="inline-block px-6 py-2 border border-[#21313c] rounded-full text-[#21313c] font-medium hover:bg-[#21313c] hover:text-white transition-colors">
                  View All Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events That Shape Campus Life Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] text-center mb-12">
            Events That Shape Campus Life
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - Signature Events */}
            <div className="bg-[#d9d9d9] p-8 relative min-h-[450px] flex flex-col justify-between">
              <div>
                {/* White Circle */}
                <div
                  className="absolute bg-white rounded-full"
                  style={{ width: '60px', height: '60px', top: '24px', right: '24px' }}
                />
                <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-8 max-w-[80%]">
                  Signature Events & Campus Experiences
                </h3>
                <p className="text-base text-[#21313c] leading-relaxed">
                  Jagran Lakecity University hosts a wide range of signature events that bring the campus to life. From academic conclaves, award ceremonies, and leadership forums to cultural showcases and student-led festivals, these events create shared experiences that define the university's vibrant atmosphere.
                </p>
              </div>
              <a href="#" className="inline-block text-[#21313c] underline font-medium hover:no-underline mt-8">
                Explore All Events
              </a>
            </div>

            {/* Card 2 - Learning, Leadership */}
            <div className="bg-[#d9d9d9] p-8 relative min-h-[450px] flex flex-col justify-between">
              <div>
                {/* White Circle */}
                <div
                  className="absolute bg-white rounded-full"
                  style={{ width: '60px', height: '60px', top: '24px', right: '24px' }}
                />
                <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-8 max-w-[80%]">
                  Learning, Leadership & Community Impact
                </h3>
                <p className="text-base text-[#21313c] leading-relaxed">
                  JLU events go beyond celebration — they are platforms for learning and leadership development. Students gain exposure to real-world conversations, industry perspectives, and collaborative problem-solving while actively contributing to planning, execution, and participation.
                </p>
              </div>
              <a href="#" className="inline-block text-[#21313c] underline font-medium hover:no-underline mt-8">
                Explore All Events
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Don't Miss Our Updates Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          <div
            className="bg-[#d9d9d9] flex items-center"
            style={{
              minHeight: '280px',
              paddingRight: '44px',
              paddingLeft: '44px',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[10px] w-full">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-2">
                  Don't Miss Our Updates
                </h2>
                <p className="text-base text-[#21313c]">
                  Join us and be a part of JLU family!
                </p>
              </div>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white text-[#21313c] placeholder-gray-400 focus:outline-none min-w-[250px]"
                />
                <button className="px-6 py-3 bg-white text-[#21313c] font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Events };
export default Events;
