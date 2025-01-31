import Link from "next/link";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa6";



export default function Footer() {
    return <>
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <div className="logo">
                    <img src="/img/logo.png" alt="logo" />
                </div>
                <div className="ul flex gap-2">
                    <li><Link href='/services'>Services</Link></li>
                    <li><Link href='/services'>Works</Link></li>
                    <li><Link href='/services'>Resume</Link></li>
                    <li><Link href='/services'>Skills</Link></li>
                    <li><Link href='/services'>Testimonials</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                </div>
                <ul className="hero_social">
                    <li><a href="/" target="_blank"><FaTwitter /></a></li>
                    <li><a href="/" target="_blank"><LiaBasketballBallSolid /></a></li>
                    <li><a href="/" target="_blank"><GrLinkedinOption /></a></li>
                    <li><a href="/" target="_blank"><FaGithub /></a></li>
                    <li><a href="/" target="_blank"><FaDiscord /></a></li>
                </ul>
                <div className="copyrights">&copy; 2024 All Rights Reserved By <span>ShivaChowdary.in</span></div>
            </div>
        </footer>
    </>
}