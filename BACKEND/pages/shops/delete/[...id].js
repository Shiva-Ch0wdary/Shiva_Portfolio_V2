import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import { toast } from 'react-toastify';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Head from 'next/head';
import { FaShoppingCart } from "react-icons/fa";

export default function Deleteshops() {

    const router = useRouter();

    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/shops?id=' + id).then(reponse => {
                setProductInfo(reponse.data)
            })
        }
    }, [id]);

    function goBack() {
        router.push('/shops')
    }

    async function deleteExperience() {
        await axios.delete('/api/shops?id=' + id)
        toast.success('Delete Sucessfully')
        goBack();
    }


    return <>
        <Head>
            <title>Delete Product</title>
        </Head>

        <div className="experiencepage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Delete <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <FaShoppingCart /> <span>/</span> <span>Delete Product</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <DeleteSweepIcon />
                    <p className="cookieHeading"> Are you Sure?</p>
                    <p className="cookieDescription"> If you delete this website content, it will be deleted permenently!</p>
                    <div className="buttonContainer">
                        <button onClick={deleteExperience} className="acceptButton">Delete</button>
                        <button onClick={goBack} className="declineButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}