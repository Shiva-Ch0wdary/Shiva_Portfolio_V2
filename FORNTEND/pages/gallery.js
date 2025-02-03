import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";


export default function gallery() {

    const { alldata, loading } = useFetchData('/api/photos')


    return <>
        <Head>
            <title>Shiva Chowdary: Gallery Photos</title>
        </Head>

        <div className="gallerypage">
            <div className="container">
                <div className="gallerytopsec">
                    <div className="topphonesec">
                        <div className="lefttitlesec">
                            <h4>SHIVA'S GALLERY</h4>
                            <h1>Shiva <br /> Photographes</h1>
                            <Link href='/gallery#galleryimages'><button>VIEW MORE</button></Link>
                        </div>
                        <div className="rightimgsec">
                            <img src="https://imgs.search.brave.com/b4GVeHi7G_jPsqLx5JHFCQxql4VmDk41JYnaZcl731A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/ZW5zaXZlLW1hbi13/aXRoLWhhdC1sb29r/aW5nLWRvd25fMTE1/My0xNDQ5LmpwZz9z/ZW10PWFpc19oeWJy/aWQ" alt="" />
                            <div className="r_img_top">
                                <img src="https://imgs.search.brave.com/7WzJGqPI2y4RzBiNBMfhbEE--F-kYiv_bsT49G4kZxs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/bG9uZGUtd29tYW4t/c3RyYXctaGF0LXN0/YW5kaW5nLW5lYXIt/d2FsbC13aXRoLWJh/cmVmb290Xzc1MDIt/ODkzNi5qcGc_c2Vt/dD1haXNfaHlicmlk" alt="" />
                                <img src="https://imgs.search.brave.com/v8HphuTp5X8WV56b9YQUJr7Q1oNFrFwuE-OoYqC44Js/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YW5kc29tZS1tYW4t/d2l0aC1oYXQtbG9v/a2luZy1hd2F5XzIz/LTIxNDg0NDg4Nzgu/anBnP3NlbXQ9YWlz/X2h5YnJpZA" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallerybtmphotos" id="galleryimages">
                <div className="container">
                    <div className="gbtmtitles text-center">
                        <h3><span>01//</span>OUR PORTFOLIO</h3>
                        <h2>Shiva Capture <span>All of your</span> <br /> beautiful memories</h2>
                    </div>
                    <div className="gallery_image_grid">
                        {loading ? <Spinner /> : <>
                            {alldata.map((photo) => {
                                return <div className="image-item">
                                    <img src={photo.images[0]} alt="" />
                                    <div className="galleryimgiteminfo">
                                        <h2>{photo.title}</h2>
                                        <p>By Shiva</p>
                                    </div>
                                </div>
                            })}
                        </>}

                    </div>
                </div>
            </div>
        </div>

    </>
}