import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter, router } from 'next/router';
import LoginLayout from "@/components/LoginLayout";
import { FaShoppingCart } from "react-icons/fa";
import Shop from "@/components/Shop";


export default function Editshops() {

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
    }, [id])
    return <>
        <Head>
            <title>Update Product</title>
        </Head>

        <div className="experiencepage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <FaShoppingCart /> <span>/</span> <span>Edit Product</span>
                </div>
            </div>
            <div className="mt-3">
                {
                    productInfo && (
                        <Shop {...productInfo} />
                    )
                }
            </div>
        </div>
    </>
}