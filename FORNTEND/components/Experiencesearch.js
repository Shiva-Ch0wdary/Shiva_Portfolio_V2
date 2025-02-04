import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";



const extractFirstParagraph = (markdown) => {
    // Split markdown by double newline to separate paragraphs
    const paragraphs = markdown.split('\n\n');
    
    // Return the first paragraph (assuming paragraphs[0] is the first paragraph)
    return paragraphs[0];
};

export default function Experiencesearch(props) {

    const { alldata = [], loading } = useFetchData('/api/experiences');  // Assuming useFetchData returns an object with alldata and loading

    const [searchResult, setSearchResult] = useState(null);
    const [experiencetitle, setExperiencetitle] = useState('');  // experiencetitle should be initialized as a string

    // filter for published experiences required
    const publishedData = alldata.filter(ab => ab.status === 'publish');

    // Function to handle search
    useEffect(() => {
        if (!experiencetitle.trim()) {  // Here, experiencetitle should be checked if it's an empty string
            setSearchResult([]);
            return;
        }

        const filteredexperiences = publishedData.filter(experience =>
            experience.title.toLowerCase().includes(experiencetitle.toLowerCase())
        );

        setSearchResult(filteredexperiences);  // setSearchResult should be used to update searchResult state

    }, [experiencetitle, alldata]);  // Include alldata in dependencies to ensure useEffect updates when data changes

    const handleExperienceClick = () => {
        setExperiencetitle('');  // This clears the input field when a experience is clicked
    };

    if (loading) return <p>Loading...</p>

    return <>
        <div className="searchexperiencefix">
            <div className="searchexperiencesectionfix">
                <div className="sbsfinput flex gap-1">
                    <input type="text"
                        placeholder='Search experience here'
                        value={experiencetitle}
                        onChange={(e) => setExperiencetitle(e.target.value)}
                    />
                    <div className='sbsinputclose' onClick={props.cls}>
                        <IoClose />                        
                    </div>
                </div>
                <div className="sbsfsearchlist mt-2">
                    {experiencetitle && (<>
                        {searchResult.length === 0 ? <h3>No Experience Found <span>(please chq your spelling)</span></h3> : <>
                            {searchResult.slice(0, 10).map((experience) => {
                                return <Link href={`/experiences/${experience.slug}`} key={experience._id} className="sbsfsbox" onClick={props.cls}>
                                    <h2>{experience.title}</h2>
                                    <p>{extractFirstParagraph(experience.description)}</p>    
                                </Link>
                            })}

                        </>}
                    </>)}

                </div>
            </div>

        </div>
    </>
}