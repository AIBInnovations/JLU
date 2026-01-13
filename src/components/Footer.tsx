export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#f6f7f0] text-[#21313c] py-12 px-6 lg:px-12" style={{ zIndex: 30 }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo and Addresses */}
          <div className="md:col-span-2">
            {/* Logo */}
            <div className="mb-8">
              <img
                src="/jlulogo.png"
                alt="Jagran Lakecity University"
                className="h-20 object-contain"
              />
            </div>

            {/* Address 1 */}
            <p className="text-[#5a6a6a] text-xs leading-relaxed mb-4 mt-8">
              Jagran Lakecity University, Mugaliyachap,
              <br />
              Near Ratibad Bhopal – 462044
            </p>

            {/* Address 2 */}
            <p className="text-[#5a6a6a] text-xs leading-relaxed">
              Jagran Lakecity University Student
              <br />
              Enrichment Hub, Near Kaliasoth Barrage,
              <br />
              Chandanpura, Bhopal – 462007
            </p>
          </div>

          {/* Address Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-[#21313c]">Address</h3>
            <address className="not-italic text-[#5a6a6a] text-xs leading-relaxed">
              Jagran Lakecity
              <br />
              University,
              <br />
              Mugaliyachap,
              <br />
              Near Ratibad
              <br />
              Bhopal – 462044
            </address>

            <h3 className="font-semibold text-sm mt-6 mb-4 text-[#21313c]">Contact</h3>
            <p className="text-[#5a6a6a] text-xs leading-relaxed">
              +44(0)1273 704 200
              <br />
              <a href="#" className="hover:text-[#8bc34a] transition-colors">
                Contact Us
              </a>
            </p>
          </div>

          {/* Our Community */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-[#21313c]">Our Community</h3>
            <nav aria-label="Community links">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Alumini
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Work with Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Partner with Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Family of Schools
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Venue Hire
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Community Hub
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-[#21313c]">Links</h3>
            <nav aria-label="Quick links">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Term Dates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Policies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Safegaurd Ng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Inspections
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                    Governors
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social + Scroll to top */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-sm mb-4 text-[#21313c]">Social</h3>
              <nav aria-label="Social media links">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors">
                      Twitter/X
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <button
              onClick={scrollToTop}
              className="text-[#5a6a6a] text-xs hover:text-[#8bc34a] transition-colors text-left mt-8"
              aria-label="Scroll to the top of the page"
            >
              Scroll to the top
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-300 mt-12 pt-6">
          <p className="text-[#5a6a6a] text-xs text-right">
            Copyright © 2025 | Jagran Lakecity University Bhopal | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
