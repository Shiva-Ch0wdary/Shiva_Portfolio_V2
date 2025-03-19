import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // Sticky header state
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [mobile, setMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const handleMobileOpen = () => {
    setMobile(!mobile);
  };

  const handleMobileClose = () => {
    setMobile(false);
  };

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={isSticky ? "sticky" : ""}>
        <nav className="container flex flex-sb">
          <div className="logo flex gap-2">
            <Link href="/">
              <img
                src={`/img/${darkMode ? "white" : "logo"}.png`}
                alt="logo"
              />
            </Link>
            <h2>Shiva Chowdary</h2>
          </div>
          <div className="navlist flex gap-2">
            <ul className="flex gap-1">
              <li>
                <Link
                  href="/"
                  onClick={() => handleLinkClick("/")}
                  className={activeLink === "/" ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  onClick={() => handleLinkClick("/projects")}
                  className={activeLink === "/projects" ? "active" : ""}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  onClick={() => handleLinkClick("/blogs")}
                  className={activeLink === "/blogs" ? "active" : ""}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  onClick={() => handleLinkClick("/gallery")}
                  className={activeLink === "/gallery" ? "active" : ""}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={() => handleLinkClick("/services")}
                  className={activeLink === "/services" ? "active" : ""}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  onClick={() => handleLinkClick("/shop")}
                  className={activeLink === "/shop" ? "active" : ""}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => handleLinkClick("/contact")}
                  className={activeLink === "/contact" ? "active" : ""}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Updated Dark Mode Toggle (inverted checked value) */}
            <label className="switch">
              <input
                id="input"
                type="checkbox"
                // Invert the value here so the UI reflects the intended state
                checked={!darkMode}
                onChange={toggleDarkMode}
              />
              <div className="slider round">
                <div className="sun-moon">
                  <svg
                    id="moon-dot-1"
                    className="moon-dot"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="moon-dot-2"
                    className="moon-dot"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="moon-dot-3"
                    className="moon-dot"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="light-ray-1"
                    className="light-ray"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="light-ray-2"
                    className="light-ray"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="light-ray-3"
                    className="light-ray"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="cloud-1"
                    className="cloud-dark"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="cloud-2"
                    className="cloud-dark"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="cloud-3"
                    className="cloud-dark"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="cloud-4"
                    className="cloud-light"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="cloud-5"
                    className="cloud-light"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    id="cloud-6"
                    className="cloud-light"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                </div>
                <div className="stars">
                  <svg id="star-1" className="star" viewBox="0 0 20 20">
                    <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                  </svg>
                  <svg id="star-2" className="star" viewBox="0 0 20 20">
                    <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                  </svg>
                  <svg id="star-3" className="star" viewBox="0 0 20 20">
                    <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                  </svg>
                  <svg id="star-4" className="star" viewBox="0 0 20 20">
                    <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                  </svg>
                </div>
              </div>
            </label>

            <button>
              <Link href="/contact">Hire Me!</Link>
            </button>
            <div className="mobiletogglesvg" onClick={handleMobileOpen}>
              <HiMiniBars3BottomRight />
            </div>
          </div>
          <div className={mobile ? "mobilenavlist active" : "mobilenavlist"}>
            <span
              onClick={handleMobileClose}
              className={mobile ? "active" : ""}
            ></span>
            <div className="mobilelogo">
              <img src="/img/white.png" alt="logo" />
              <h2>Shiva Rama Krishna</h2>
            </div>
            <ul
              className="flex gap-1 flex-col flex-left mt-3"
              onClick={handleMobileClose}
            >
              <li>
                <Link
                  href="/"
                  onClick={() => handleLinkClick("/")}
                  className={activeLink === "/" ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  onClick={() => handleLinkClick("/projects")}
                  className={activeLink === "/projects" ? "active" : ""}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  onClick={() => handleLinkClick("/blogs")}
                  className={activeLink === "/blogs" ? "active" : ""}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  onClick={() => handleLinkClick("/gallery")}
                  className={activeLink === "/gallery" ? "active" : ""}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={() => handleLinkClick("/services")}
                  className={activeLink === "/services" ? "active" : ""}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  onClick={() => handleLinkClick("/shop")}
                  className={activeLink === "/shop" ? "active" : ""}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => handleLinkClick("/contact")}
                  className={activeLink === "/contact" ? "active" : ""}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <p>Copyright &copy; 2024 | ShivaChowdary.in</p>
          </div>
        </nav>
      </header>
    </>
  );
}
