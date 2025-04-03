import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { MdSchool, MdWorkHistory, MdMiscellaneousServices } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { GrUserSettings } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Aside({ asideopen, handleAsideOpen }) {
  const router = useRouter();
  const [clicked, setclicked] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const handleClick = () => {
    setclicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink((preActive) => (preActive === link ? null : link));
    setclicked(false);
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/signup" }); // Redirect to /auth/signup after logout
  };

  if (session) {
    return (
      <>
        <aside className={asideopen ? "asideleft active" : "asideleft"}>
        <div className="aside-content">
          <ul>
            <Link href="/">
              <li className="navactive">
                <IoHome />
                <span>Dashboard</span>
              </li>
            </Link>

            <li
              className={
                activeLink === "/projects"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/projects")}
            >
              <div className="flex gap-1">
                <MdWorkHistory />
                <span>Projects</span>
              </div>
              {activeLink === "/projects" && (
                <ul>
                  <Link href="/projects">
                    <li>All Projects</li>
                  </Link>
                  <Link href="/projects/draftprojects">
                    <li>Draft Projects</li>
                  </Link>
                  <Link href="/projects/addproject">
                    <li>Add Projects</li>
                  </Link>
                </ul>
              )}
            </li>

            <li
              className={
                activeLink === "/education"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/education")}
            >
              <div className="flex gap-1">
                <MdSchool />
                <span>Education</span>
              </div>
              {activeLink === "/education" && (
                <ul>
                  <Link href="/education">
                    <li>All Educations</li>
                  </Link>
                  <Link href="/education/add">
                    <li>Add Education</li>
                  </Link>
                </ul>
              )}
            </li>

            <li
              className={
                activeLink === "/services"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/services")}
            >
              <div className="flex gap-1">
                <MdMiscellaneousServices />
                <span>Services</span>
              </div>
              {activeLink === "/services" && (
                <ul>
                  <Link href="/services">
                    <li>All Services</li>
                  </Link>
                  <Link href="/services/add">
                    <li>Add Service</li>
                  </Link>
                </ul>
              )}
            </li>

            <li
              className={
                activeLink === "/experience"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/experience")}
            >
              <div className="flex gap-1">
                <MdTravelExplore />
                <span>Blog</span>
              </div>
              {activeLink === "/experience" && (
                <ul>
                  <Link href="/blogs">
                    <li>All Blog</li>
                  </Link>
                  <Link href="/blogs/draftblog">
                    <li>Draft Blog</li>
                  </Link>
                  <Link href="/blogs/addblog">
                    <li>Add Blog</li>
                  </Link>
                </ul>
              )}
            </li>

            <li
              className={
                activeLink === "/shops"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/shops")}
            >
              <div className="flex gap-1">
                <FaShoppingCart />
                <span>Shops</span>
              </div>
              {activeLink === "/shops" && (
                <ul>
                  <Link href="/shops">
                    <li>All Shops</li>
                  </Link>
                  <Link href="/shops/draftshop">
                    <li>Draft Shops</li>
                  </Link>
                  <Link href="/shops/addproduct">
                    <li>Add Shops</li>
                  </Link>
                </ul>
              )}
            </li>

            <li
              className={
                activeLink === "/gallery"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/gallery")}
            >
              <div className="flex gap-1">
                <GrGallery />
                <span>Gallery</span>
              </div>
              {activeLink === "/gallery" && (
                <ul>
                  <Link href="/gallery">
                    <li>All Photos</li>
                  </Link>
                  <Link href="/gallery/addphoto">
                    <li>Add Photos</li>
                  </Link>
                </ul>
              )}
            </li>

            <Link href="/contacts">
              <li
                className={activeLink === "/contacts" ? "nativeactive" : ""}
                onClick={() => handleLinkClick("/contacts")}
              >
                <IoIosContacts />
                <span>Contacts</span>
              </li>
            </Link>

            <Link href="/setting">
              <li
                className={activeLink === "/setting" ? "nativeactive" : ""}
                onClick={() => handleLinkClick("/setting")}
              >
                <GrUserSettings />
                <span>Settings</span>
              </li>
            </Link>
          </ul>
          </div>
          <button onClick={handleLogout} className="logoutbtn">
            Logout
          </button>
        </aside>
      </>
    );
  }
}
