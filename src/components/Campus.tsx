import { motion } from 'framer-motion';
import { useState } from 'react';

const infrastructureItems = [
  { id: 1, label: 'Academic Blocks' },
  { id: 2, label: 'Studios & Labs' },
  { id: 3, label: 'Library & Learning Spaces' },
  { id: 4, label: 'Indoor Multipurpose Hall' },
];

const Campus = () => {
  const [activeInfrastructure, setActiveInfrastructure] = useState(1);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative w-screen bg-[#d9d9d9] overflow-hidden m-0 p-0"
        style={{ minHeight: '100vh' }}
      >
        {/* Content */}
        <div
          className="absolute flex items-center justify-between"
          style={{
            top: '200px',
            left: '120px',
            right: '120px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#21313c]">
              Campus
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ maxWidth: '400px' }}
          >
            <p className="text-base text-[#21313c] leading-relaxed">
              Life at our campus goes beyond classrooms and lectures. It is a vibrant ecosystem where academic excellence, creativity, collaboration, and community life come together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Campus Infrastructure Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Campus Infrastructure
          </h2>

          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Content */}
            <div style={{ maxWidth: '500px' }}>
              <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
                Architectural Excellence<br />for Future Leaders
              </h3>
              <p className="text-sm text-[#21313c] leading-relaxed mb-10">
                Our campus is a masterwork of modern design, featuring state-of-the-art facilities that foster innovation, collaboration, and academic rigor.
              </p>

              {/* Infrastructure Items */}
              <div className="flex flex-col">
                {infrastructureItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveInfrastructure(item.id)}
                    className={`flex items-center justify-between py-4 border-b border-gray-300 text-left ${
                      activeInfrastructure === item.id ? 'font-medium' : ''
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-sm text-[#21313c]">
                        {String(item.id).padStart(2, '0')}
                      </span>
                      <span className="text-base text-[#21313c]">{item.label}</span>
                    </span>
                    {activeInfrastructure === item.id && (
                      <span className="text-[#21313c]">→</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Image Placeholder */}
            <div
              className="bg-[#d9d9d9] shrink-0"
              style={{ width: '580px', height: '611px' }}
            />
          </div>
        </div>
      </div>

      {/* Residences & Dining Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-4">
            Residences & Dining
          </h2>

          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
              More than a room,<br />A place to belong
            </h3>
            <p className="text-sm text-[#21313c] leading-relaxed" style={{ maxWidth: '500px' }}>
              Experience a vibrant campus life where comfort meets community. Our residences and dining halls are designed to be the heart of your student journey.
            </p>
          </div>

          {/* Student Accommodation Card */}
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <div className="relative">
              {/* Image Placeholder */}
              <div
                className="bg-[#d9d9d9]"
                style={{ width: '580px', height: '550px' }}
              />
              {/* Label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xl font-bold text-[#21313c]">
                  Student Accommodation
                </h4>
              </div>
            </div>
            <div className="flex flex-col justify-center" style={{ maxWidth: '400px' }}>
              <p className="text-sm text-[#21313c] leading-relaxed mb-6">
                Modern living spaces tailored for academic success and personal growth. From private studios to shared apartments, find your perfect home
              </p>
              <ul className="text-sm text-[#21313c]">
                <li>• Safety & Security • Comfortable Living</li>
                <li>• Community Spaces</li>
              </ul>
            </div>
          </div>

          {/* Dining & Nutrition Card */}
          <div className="flex flex-col lg:flex-row-reverse gap-8">
            <div className="relative">
              {/* Image Placeholder */}
              <div
                className="bg-[#d9d9d9]"
                style={{ width: '580px', height: '550px' }}
              />
              {/* Label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xl font-bold text-[#21313c]">
                  Dining & Nutrition
                </h4>
              </div>
            </div>
            <div className="flex flex-col justify-center" style={{ maxWidth: '400px' }}>
              <p className="text-sm text-[#21313c] leading-relaxed mb-6">
                Global flavors and healthy choices served daily. Our dining halls are social hubs where ideas are shared over exceptional meals.
              </p>
              <ul className="text-sm text-[#21313c]">
                <li>• Diverse Cuisine • Hygienic Kitchens</li>
                <li>• Social Dining Spaces</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sports & Wellness Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-4">
            Sports & Wellness
          </h2>

          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
              Cultivating balance,<br />Fueling excellence
            </h3>
            <p className="text-sm text-[#21313c] leading-relaxed" style={{ maxWidth: '700px' }}>
              Physical wellbeing is integral to academic success. Our sports programs and wellness spaces are designed to provide balance, foster teamwork, and promote a lifelong commitment to health.
            </p>
          </div>

          {/* Sports Cards */}
          <div className="flex gap-6">
            {/* Left Card - Outdoor Sports */}
            <div className="relative">
              <div
                className="bg-[#d9d9d9]"
                style={{ width: '683px', height: '550px' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs text-[#21313c] mb-1">Key Facility</p>
                <h4 className="text-xl font-bold text-[#21313c]">
                  Outdoor Sports Facilities
                </h4>
              </div>
            </div>

            {/* Right Card - Fitness & Wellness */}
            <div className="relative">
              <div
                className="bg-[#d9d9d9]"
                style={{ width: '477px', height: '550px' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xl font-bold text-[#21313c]">
                  Fitness & Wellness Areas
                </h4>
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="flex justify-center mt-12">
            <a href="#" className="text-[#21313c] underline font-medium hover:no-underline">
              View all Facilities
            </a>
          </div>
        </div>
      </div>

      {/* Campus Gallery Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="relative mx-auto overflow-hidden"
          style={{ maxWidth: '1440px', height: '1000px' }}
        >
          {/* Card 1 - Top Left */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '403px', height: '238px', top: '0px', left: '188px' }}
          />
          {/* Card 2 - Top Center */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '308px', height: '325px', top: '0px', left: '753px' }}
          />
          {/* Card 3 - Top Right (partially cut) */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '193px', height: '193px', top: '-50px', left: '1284px' }}
          />
          {/* Card 4 - Middle Right */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '215px', height: '215px', top: '302px', left: '1154px' }}
          />
          {/* Card 5 - Middle Left */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '267px', height: '325px', top: '308px', left: '0px' }}
          />
          {/* Card 6 - Bottom Left (partially cut) */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '212px', height: '175px', top: '750px', left: '-56px' }}
          />
          {/* Card 7 - Bottom Center Left */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '214px', height: '325px', top: '675px', left: '319px' }}
          />
          {/* Card 8 - Bottom Center */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '399px', height: '210px', top: '790px', left: '627px' }}
          />
          {/* Card 9 - Bottom Right */}
          <div
            className="absolute bg-[#d9d9d9]"
            style={{ width: '286px', height: '343px', top: '601px', left: '1154px' }}
          />

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#21313c] mb-4">
              Campus Gallery: A Living<br />Learning Environment
            </h2>
            <a href="#" className="text-lg text-[#21313c] underline hover:no-underline">
              Explore Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Campus };
export default Campus;
