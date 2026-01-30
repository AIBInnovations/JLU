'use client';

import { motion } from 'framer-motion';

const studentLifeItems = [
  {
    id: 1,
    title: 'Find your people',
    description: 'Creative, technical, cultural, and sports clubs that help you build friendships and discover your strengths.',
    link: 'Explore clubs',
  },
  {
    id: 2,
    title: 'Lead. Represent. Inspire.',
    description: 'The student council gives you a voice in shaping campus culture and decision-making.',
    link: 'Meet the council',
  },
  {
    id: 3,
    title: 'Celebrating student success',
    description: 'From national competitions to startup wins — our students create impact beyond campus.',
    link: 'View Achievements',
  },
];

const careersItems = [
  {
    id: 1,
    title: 'Where careers begin',
    description: 'Strong industry connections that translate learning into internships, placements, and real-world exposure.',
    link: 'Explore corporate relations',
  },
  {
    id: 2,
    title: 'Where ideas become startups',
    description: 'IgnitoX supports student entrepreneurs with mentorship, funding access, and incubation support.',
    link: 'Discover IgnitoX',
  },
  {
    id: 3,
    title: 'Conversations that shape thinking',
    description: 'A platform for leaders, innovators, and thinkers to inspire the next generation.',
    link: 'View lecture series',
  },
];

const CampusLife = () => {
  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-screen bg-[#d9d9d9] m-0 p-0">
        <div
          className="w-full relative"
          style={{
            minHeight: '100vh',
          }}
        >
          <div
            className="absolute"
            style={{
              top: '200px',
              left: '120px',
              maxWidth: '550px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-[#21313c] mb-6 leading-tight">
                Life beyond<br />classrooms
              </h1>
              <p className="text-base text-[#21313c] leading-relaxed mb-8" style={{ maxWidth: '450px' }}>
                From student leadership and vibrant clubs to innovation hubs and career pathways — campus life here shapes who you become.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-[#21313c] font-medium hover:bg-gray-100 transition-colors">
                Explore student life
                <span>→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Student Life & Careers Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            minHeight: '1285px',
            paddingTop: '180px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex" style={{ gap: '40px' }}>
            {/* Section 01 - Student Life */}
            <div style={{ flex: 1 }}>
              <p
                className="text-[#21313c]"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  marginBottom: '16px',
                }}
              >
                Section 01
              </p>
              <h2
                className="text-[#21313c]"
                style={{
                  fontWeight: 700,
                  fontSize: '48px',
                  lineHeight: '100%',
                  marginBottom: '64px',
                }}
              >
                Student life
              </h2>

              <div className="flex flex-col" style={{ gap: '56px' }}>
                {studentLifeItems.map((item) => (
                  <div key={item.id}>
                    <h3
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 500,
                        fontSize: '32px',
                        lineHeight: '100%',
                        marginBottom: '24px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '34px',
                        marginBottom: '24px',
                      }}
                    >
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#21313c] hover:underline"
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      {item.link}
                      <span>→</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div
              style={{
                width: '1px',
                backgroundColor: '#d9d9d9',
                alignSelf: 'stretch',
              }}
            />

            {/* Section 02 - Careers, Innovation & Experiences */}
            <div style={{ flex: 1 }}>
              <p
                className="text-[#21313c]"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  marginBottom: '16px',
                }}
              >
                Section 02
              </p>
              <h2
                className="text-[#21313c]"
                style={{
                  fontWeight: 700,
                  fontSize: '48px',
                  lineHeight: '100%',
                  marginBottom: '64px',
                }}
              >
                Careers, innovation &<br />experiences
              </h2>

              <div className="flex flex-col" style={{ gap: '56px' }}>
                {careersItems.map((item) => (
                  <div key={item.id}>
                    <h3
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 500,
                        fontSize: '32px',
                        lineHeight: '100%',
                        marginBottom: '24px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '34px',
                        marginBottom: '24px',
                      }}
                    >
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#21313c] hover:underline"
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      {item.link}
                      <span>→</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto flex items-center"
          style={{
            maxWidth: '1440px',
            height: '740px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
            gap: '64px',
          }}
        >
          {/* Image Placeholder */}
          <div
            className="bg-[#d9d9d9] shrink-0"
            style={{ width: '580px', height: '580px' }}
          />

          {/* Content */}
          <div style={{ maxWidth: '436px' }}>
            <h2
              className="text-[#21313c]"
              style={{
                fontWeight: 700,
                fontSize: '40px',
                lineHeight: '48px',
                marginBottom: '24px',
              }}
            >
              More than a campus — it's a community
            </h2>
            <p
              className="text-[#6b7280]"
              style={{
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '30px',
                marginBottom: '32px',
              }}
            >
              Every event, club, and initiative is designed to help students grow not just academically, but personally and professionally.
            </p>
            <button
              className="inline-flex items-center gap-2 bg-white border border-[#d9d9d9] rounded-full text-[#21313c] hover:bg-gray-50 transition-colors"
              style={{
                paddingTop: '16px',
                paddingRight: '32px',
                paddingBottom: '16px',
                paddingLeft: '32px',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              Join our community
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CampusLife };
export default CampusLife;
