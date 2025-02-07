import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";

export default function Contact() {
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    // Initialize project as an array for multiple selections
    const [project, setProject] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [messageOk, setMessageOk] = useState('');

    async function createProduct(ev) {
        ev.preventDefault();
        setMessageOk('Sending...');

        // Convert the project array into a comma-separated string
        const data = { 
            name, 
            lname, 
            email, 
            phone, 
            company, 
            country, 
            project: project.join(', '), 
            price, 
            description 
        };

        try {
            await axios.post('/api/contacts', data);
            setMessageOk('✅ Message Sent Successfully!');
            setName('');
            setLname('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject([]);
            setPrice('');
            setDescription('');
        } catch (error) {
            if (error.response) {
                console.error('Server Error', error.response.data);
            } else if (error.request) {
                console.error("Network Error", error.request);
            } else {
                console.error('error', error.message);
            }
            setMessageOk('❌ Failed to send message');
        }
    }

    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)) {
            setProject(project.filter(p => p !== projectName));
        } else {
            setProject([...project, projectName]);
        }
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    return (
        <>
            <Head>
                <title>Contact us</title>
            </Head>

            <div className="contactpage" >
                <div className="container">
                    <div className="contactformp"data-aos="fade-up">
                        <div className="leftcontp">
                            <h2>Get in touch</h2>
                            <h2>Let's talk about your project</h2>
                            <p>Thinking about a new project, a problem to solve, or just want to connect? Let's do it!</p>
                            <p>Use the form on this page or get in touch by other means.</p>
                            <p>We love questions and feedback - and we're always happy to help!</p>
                            <p>Here are some ways to contact us.</p>
                            <div className="leftsociinfo">
                                <ul>
                                    <li>
                                        <FaPhoneVolume />
                                        <span>
                                            Phone:
                                            <a href="tel:+123456789" rel="nofollow" target="_blank">
                                                +91-123456789
                                            </a>
                                        </span>
                                    </li>
                                    <li>
                                        <MdAttachEmail />
                                        <span>
                                            Email:
                                            <a href="mailto:shivachowdary753@gmail.com" rel="nofollow" target="_blank">
                                                shivachowdary
                                            </a>
                                        </span>
                                    </li>
                                    <li>
                                        <GrLinkedin />
                                        <span>
                                            Linkedin:
                                            <a href="https://www.linkedin.com/" rel="nofollow" target="_blank">
                                                Shiva Chowdary
                                            </a>
                                        </span>
                                    </li>
                                    <li>
                                        <FaTwitter />
                                        <span>
                                            Twitter:
                                            <a href="http://twitter.com/" rel="nofollow" target="_blank">
                                                @shiva
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="rightcontp">
                            <form onSubmit={createProduct}>
                                <div className="rightconttitle">
                                    <h2>Your Contact information</h2>
                                </div>
                                <div className="rightcontinputs">
                                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="First name" required />
                                    <input type="text" value={lname} onChange={ev => setLname(ev.target.value)} placeholder="Last name" />
                                    <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Email address" required />
                                    <input type="text" value={company} onChange={ev => setCompany(ev.target.value)} placeholder="Company name" />
                                    <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Phone number" required />
                                    <select id="country" value={country} onChange={ev => setCountry(ev.target.value)} name="country">
                                        <option value="">Select Country</option>
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="Åland Islands">Åland Islands</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Algeria">Algeria</option>
                                        <option value="American Samoa">American Samoa</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Anguilla">Anguilla</option>
                                        <option value="Antarctica">Antarctica</option>
                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Aruba">Aruba</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbados</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Belize">Belize</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Bermuda">Bermuda</option>
                                        <option value="Bhutan">Bhutan</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Bouvet Island">Bouvet Island</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                                        <option value="Bulgaria">Bulgaria</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Cape Verde">Cape Verde</option>
                                        <option value="Cayman Islands">Cayman Islands</option>
                                        <option value="Central African Republic">Central African Republic</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Christmas Island">Christmas Island</option>
                                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Comoros">Comoros</option>
                                        <option value="Congo">Congo</option>                               
                                        <option value="Cook Islands">Cook Islands</option>
                                        <option value="Costa Rica">Costa Rica</option>
                                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                                        <option value="Croatia">Croatia</option>
                                        <option value="Cuba">Cuba</option>
                                        <option value="Cyprus">Cyprus</option>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                                <div className="rightconttitle">
                                    <h2>What services do you need for your project?</h2>
                                </div>
                                <div className="rightcontcheckbox">
                                    {[
                                        'Website Development',
                                        'App Development',
                                        'Design System',
                                        'Website Migration',
                                        'E-commerce Site',
                                        'Game Development',
                                    ].map((projectOptions) => (
                                        <label
                                            className="cyberpunk-checkbox-label"
                                            key={projectOptions}
                                        >
                                            <input
                                                type="checkbox"
                                                className="cyberpunk-checkbox"
                                                value={projectOptions}
                                                checked={project.includes(projectOptions)}
                                                onChange={() => handleProjectChange(projectOptions)}
                                            />
                                            {projectOptions}
                                        </label>
                                    ))}
                                </div>
                                <div className="rightconttitle">
                                    <h2>How much is the anticipated budget for your next project?</h2>
                                </div>
                                <div className="rightcontredio">
                                    {[
                                        'Less than $400',
                                        '$400 - $800',
                                        '$800 - $1000',
                                        'More than $1000'
                                    ].map((priceRange) => (
                                        <div key={priceRange} className="radio-button">
                                            <input
                                                type="radio"
                                                id={priceRange}
                                                name="example-radio"
                                                value={priceRange}
                                                checked={price === priceRange}
                                                onChange={handlePriceChange}
                                            />
                                            <span className="radio"></span>
                                            <label htmlFor={priceRange}>{priceRange}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="rightconttitle">
                                    <h2>Tell me about your project</h2>
                                </div>
                                <div className="rightcontpera">
                                    <textarea
                                        value={description}
                                        onChange={ev => setDescription(ev.target.value)}
                                        name="description"
                                        rows={4}
                                        placeholder="Project description"
                                    ></textarea>
                                </div>
                                <hr />
                                <div className="righhcontsbtn flex gap-3" data-aos="fade-left">
                                    <button type="submit">Submit</button>
                                    <p>{messageOk}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
