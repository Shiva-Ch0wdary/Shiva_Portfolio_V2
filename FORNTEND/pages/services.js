import Head from "next/head";
import { HiXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

export default function services() {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>

      <div className="servicespage">
        <div className="topservices">
          <div className="container" data-aos="fade-up">
            <h2>Shiva's Services</h2>
            <p>
              Home <span>&gt;</span> services
            </p>
          </div>
        </div>
        <div className="centerservices">
          <div className="container">
            <div className="cservicesbox">
              {/* Web Development */}
              <div className="csservice" data-aos="fade-right">
                <span>01</span>
                <div>
                  <h2>Web Development</h2>
                  <img src="/img/web.svg" alt="web icon" />
                  <ul>
                    <li>
                      Full-stack solutions with React.js, Node.js, MongoDB
                    </li>
                    <li>Performance-optimized and responsive designs</li>
                    <li>Custom dashboards and admin panels</li>
                    <li>Dockerized deployments for scalability</li>
                    <li>Secure authentication and user management</li>
                  </ul>
                  <p>
                    Crafting fast, responsive, and scalable web experiences.
                    Delivering tailored web solutions to turn ideas into
                    reality, enhancing business growth and user engagement.
                  </p>
                </div>
              </div>

              {/* Mobile App Development */}
              <div className="csservice" data-aos="fade-right">
                <span>02</span>
                <div>
                  <h2>Mobile App Development</h2>
                  <img src="/img/android.svg" alt="" />
                </div>
                <ul>
                  <li>Cross-platform apps using modern frameworks</li>
                  <li>Smooth UI/UX design for Android & iOS</li>
                  <li>Real-time features like chat and notifications</li>
                  <li>API integrations and scalable backend support</li>
                  <li>App Store optimized deployment</li>
                </ul>
                <p>
                  Delivering seamless experiences across devices. Building
                  high-performance, user-friendly mobile apps that bring ideas
                  to life and connect with users globally.
                </p>
              </div>

              {/* AI-Powered Solutions */}
              <div className="csservice" data-aos="fade-up">
                <span>03</span>
                <div>
                  <h2>AI-Powered Solutions</h2>
                  <img src="/img/ai.svg" alt="" />
                </div>
                <ul>
                  <li>AI-driven chatbots with high accuracy</li>
                  <li>Real-time health monitoring systems</li>
                  <li>Predictive analytics dashboards</li>
                  <li>Custom ML model integration</li>
                  <li>Automation for smarter applications</li>
                </ul>
                <p>
                  Building smarter systems for modern applications. Automating
                  workflows and enhancing user experience with intelligent,
                  data-driven solutions.
                </p>
              </div>

              {/* Game & Immersive Development */}
              <div className="csservice" data-aos="fade-up">
                <span>04</span>
                <div>
                  <h2>Game & Immersive Development</h2>
                  <img src="/img/game.svg" alt="" />
                </div>
                <ul>
                  <li>Unity3D game development for mobile and desktop</li>
                  <li>VR/AR immersive simulations (Oculus SDK, Unity)</li>
                  <li>Custom game mechanics and physics simulations</li>
                  <li>
                    Cross-platform compatibility and performance optimization
                  </li>
                  <li>
                    From prototypes to polished releases — end-to-end
                    development
                  </li>
                </ul>
                <p>
                  Bringing ideas to life with interactive experiences. Creating
                  immersive, engaging games and simulations that captivate users
                  across platforms.
                </p>
              </div>

              {/* UI/UX & Product Design */}
              <div className="csservice" data-aos="fade-left">
                <span>05</span>
                <div>
                  <h2>UI/UX & Product Design</h2>
                  <img src="/img/ui.svg" alt="" />
                </div>
                <ul>
                  <li>Interactive prototypes and wireframes</li>
                  <li>Responsive and accessible designs</li>
                  <li>Tailored UI/UX for web and game interfaces</li>
                  <li>Conversion-focused layouts and smooth user journeys</li>
                  <li>
                    Collaborative design process to align with your brand
                    identity
                  </li>
                </ul>
                <p>
                  Designs that are both beautiful and user-centric. Crafting
                  experiences that blend aesthetics with functionality to
                  deliver outstanding digital products.
                </p>
              </div>

              {/* E-commerce Solutions */}
              <div className="csservice" data-aos="fade-left">
                <span>06</span>
                <div>
                  <h2>E-commerce Solutions</h2>
                  <img src="/img/ecommerce.svg" alt="" />
                </div>
                <ul>
                  <li>Custom e-commerce platforms</li>
                  <li>Secure payment & inventory systems</li>
                  <li>Product filtering and search features</li>
                  <li>Admin dashboard for order management</li>
                  <li>Optimized performance for conversions</li>
                </ul>
                <p>
                  Building scalable online businesses with seamless user
                  experiences. Helping brands establish a powerful digital
                  presence and drive sales effectively.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plan Section */}
        <div className="pricingplansec">
          <div className="container">
            <div className="pricingtitles text-center" data-aos="fade-up">
              <h3>
                <img src="/img/chevron_right.png" alt="" /> PRICING PLAN
              </h3>
              <h2> Pricing My Work</h2>
            </div>

            <div className="pricingcards">
              {/* Life Plan */}
              <div className="pricingcard" data-aos="fade-right">
                <h4>Life Plan</h4>
                <p>Perfect choice for individuals starting out</p>
                <h2>
                  $29.00 <span>Monthly</span>
                </h2>
                <a href="/contact">
                  <button>Get Start Now</button>
                </a>
                <div>
                  <h5>Lite includes:</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> Personal and client panel access
                    </li>
                    <li>
                      <IoMdCheckmark /> Basic UI & dashboard
                    </li>
                    <li>
                      <HiXMark /> Multi-language support (optional)
                    </li>
                    <li>
                      <HiXMark /> Advanced integrations
                    </li>
                  </ul>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="pricingcard" data-aos="fade-up">
                <h4>Premium Plan</h4>
                <p>For growing businesses and advanced needs</p>
                <h2>
                  $39.00 <span>Monthly</span>
                </h2>
                <a href="/contact">
                  <button>Get Start Now</button>
                </a>
                <div>
                  <h5>Everything in Lite, plus:</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> Premium UI design & features
                    </li>
                    <li>
                      <IoMdCheckmark /> Advanced dashboard & admin panel
                    </li>
                    <li>
                      <IoMdCheckmark /> Multi-language support
                    </li>
                    <li>
                      <HiXMark /> Full custom integrations
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="pricingcard" data-aos="fade-left">
                <h4>Pro Plan</h4>
                <p>Full professional experience with all features</p>
                <h2>
                  $49.00 <span>Monthly</span>
                </h2>
                <a href="/contact">
                  <button>Get Start Now</button>
                </a>
                <div>
                  <h5>Everything in Premium, plus:</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> Full custom integrations (AI, APIs)
                    </li>
                    <li>
                      <IoMdCheckmark /> E-commerce & advanced analytics
                    </li>
                    <li>
                      <IoMdCheckmark /> Multi-language support
                    </li>
                    <li>
                      <IoMdCheckmark /> Priority support and updates
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
