import Head from "next/head";
import { HiXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

export default function services() {
    return <>
        <Head>
            <title>Services</title>
        </Head>

        <div className="servicespage">
            <div className="topservices">
                <div className="container" data-aos="fade-up">
                    <h2>Shiva's Services</h2>
                    <p>Home <span>&gt;</span> services</p>
                </div>
            </div>
            <div className="centerservices">
                <div className="container">
                    <div className="cservicesbox">
                        <div className="csservice" data-aos="fade-right">
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt="web icon" />
                                <ul>
                                    <li>Performance &amp; Load Time</li>
                                    <li>Reusable Components</li>
                                    <li>Responsiveness</li>
                                    <li>Quality assurance and testing.</li>
                                    <li>Ongoing maintenance, updates, and bug fixes.</li>
                                </ul>
                                <p>I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need.</p>
                            </div>
                        </div>
                        <div class="csservice" data-aos="fade-right">
                            <span>04</span>
                            <div>
                                <h2>Content Creator</h2>
                                <img src="https://www.svgrepo.com/show/474360/photo-album.svg" alt="" />
                            </div>
                            <ul>
                                <li>Crispy Digital Editing</li>
                                <li>Marketing and Promotion on Social Platforms</li>
                                <li>Client communication skill</li>
                            </ul>
                            <p>Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content.</p>
                        </div>
                        <div class="csservice" data-aos="fade-up">
                            <span>02</span>
                            <div>
                                <h2>Mobile Development</h2>
                                <img src="https://www.svgrepo.com/show/475631/android-color.svg" alt="" />
                            </div>
                            <ul>
                                <li>Prototyping and Wireframing</li>
                                <li>UI/UX Design</li>
                                <li>Coding and Programming</li>
                                <li>Quality Assurance (QA) Testing</li>
                                <li>App Deployment</li>
                            </ul>
                            <p>Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development.</p>
                        </div>
                        <div class="csservice" data-aos="fade-up">
                            <span>05</span>
                            <div>
                                <h2>UI/UX Product Design</h2>
                                <img src="https://www.svgrepo.com/show/475614/ui-china.svg" alt="" />
                            </div>
                            <ul>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing.</li>
                                <li>UI/UX Design</li>
                            </ul>
                            <p>I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need.</p>
                        </div>
                        <div class="csservice" data-aos="fade-left">
                            <span>03</span>
                            <div>
                                <h2>Digital Marketing (SEO)</h2>
                                <img src="https://www.svgrepo.com/show/335789/seo.svg" alt="" />
                            </div>
                            <ul>
                                <li>Marketing Strategy</li>
                                <li>Research On Customer</li>
                                <li>Monetize Products</li>
                            </ul>
                            <p>My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers.</p>
                        </div>
                        <div class="csservice" data-aos="fade-left">
                            <span>06</span>
                            <div>
                                <h2>E-commerce Business Solutions</h2>
                                <img src="https://www.svgrepo.com/show/475678/shopify-color.svg" alt="" />
                            </div>
                            <ul>
                                <li>Ecommerce store</li>
                                <li>Online Purchase</li>
                                <li>Quality assurance and testing.</li>
                                <li>Marketing and Promotion on Social Platforms</li>
                            </ul>
                            <p>My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers.</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="pricingplansec">
                <div className="container">
                    <div className="pricingtitles text-center" data-aos="fade-up">
                        <h3><img src="/img/chevron_right.png" alt="" />   PRICING PLAN</h3>
                        <h2> Pricing My Work</h2>
                    </div>

                    <div className="pricingcards">
                        <div className="pricingcard" data-aos="fade-right">
                            <h4>Life Plan</h4>
                            <p>Perfect Choice for individual</p>
                            <h2>$29.00 <span>Monthly</span></h2>
                            <a href="/contact"><button>Get Start Now</button></a>
                            <div>
                                <h5>Lite includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark /> Powerful admin panel</li>
                                    <li><IoMdCheckmark /> 1 Native android app</li>
                                    <li><HiXMark /> Multi-language support</li>
                                    <li><HiXMark /> Multi-language support</li>
                                </ul>
                            </div>
                        </div>
                        <div class="pricingcard aos-init aos-animate" data-aos="fade-up">
                            <h4>Premium Plan</h4>
                            <p>Perfect Choice for individual</p>
                            <h2>$39.00 <span>Monthly</span></h2>
                            <a href="/contact"><button>Get Start Now</button></a>
                            <div>
                                <h5>Everything in lite, plus:</h5>
                                <ul>
                                    <li><IoMdCheckmark /> Powerful admin panel</li>
                                    <li><IoMdCheckmark /> 1 Native android app</li>
                                    <li><HiXMark /> Multi-language support</li>
                                    <li><HiXMark /> Multi-language support</li>
                                </ul>
                            </div>
                        </div>

                        <div class="pricingcard" data-aos="fade-left">
                            <h4>Pro Plan</h4>
                            <p>Perfect Choice for individual</p>
                            <h2>$49.00 <span>Monthly</span></h2>
                            <a href="/contact"><button>Get Start Now</button></a>
                            <div>
                                <h5>Everything in pro, plus:</h5>
                                <ul>
                                    <li><IoMdCheckmark /> Powerful admin panel</li>
                                    <li><IoMdCheckmark /> 1 Native android app</li>
                                    <li><HiXMark /> Multi-language support</li>
                                    <li><HiXMark /> Multi-language support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}