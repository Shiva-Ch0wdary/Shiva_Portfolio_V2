import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';

export default function experiences() {

   
    return <>
        <Head>
            <title>Experiences</title>
        </Head>
        <div className="experiencepage">
            <div className="tophero">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>Welcome to <span>Shiva's Experiences</span></h1>
                            <p>I break down complex user experiences problems to create integritiy focused solutions that connect billions of people</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}