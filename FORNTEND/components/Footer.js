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
                    
                    <li><Link href='/projects'>Projects</Link></li>
                    <li><Link href='/gallery'>Gallery</Link></li>
                    <li><Link href='/experiences'>Experiences</Link></li>
                    <li><Link href='/services'>Testimonials</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                    <li><Link href='/services'>Services</Link></li>
                </div>
                <ul className="hero_social">
                    <li><a href="/"><LiaBasketballBallSolid /></a></li>
                    <li><a target="_blank" href="https://www.linkedin.com/in/mandapudi-shiva-rama-krishna-588706204/"><GrLinkedinOption /></a></li>
                    <li><a target="_blank" href="https://github.com/Shiva-Ch0wdary"><FaGithub /></a></li>
                    <li><a target="_blank" href="https://discordapp.com/users/Shiva_Ram#5331"><FaDiscord /></a></li>
                    <li><a target="_blank" href="https://x.com/Shiva_Mandepudi?t=NiSjxAeFQBU1fudyPRov6A&s=09"><FaTwitter /></a></li>
                </ul>
                <div className="copyrights">&copy; 2024 All Rights Reserved By <span>ShivaChowdary.in</span></div>
            </div>
        </footer>
    </>
}