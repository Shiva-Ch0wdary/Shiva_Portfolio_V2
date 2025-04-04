import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

export default function shop() {
  const { alldata, loading } = useFetchData("/api/shops");

  const publishedData = alldata.filter((ab) => ab.status === "publish");

  const createdAtDate =
    alldata && alldata[0]?.createdAt
      ? new Date(alldata && alldata[0]?.createdAt)
      : null;

  const formaDate = (date) => {
    if (!date || isNaN(date)) {
      return "";
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-Us", options).format(date);
  };

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <div className="shoppage">
        <div className="shoppagetoptitle">
          <div className="container" data-aos="fade-up">
            <h3>SHOP ONLINE</h3>
            <h2>OUR PRODUCTS</h2>
          </div>
        </div>
        <div className="shopproducts">
          <div className="container">
            <div className="shopproducts">
              <div className="container">
                <div className="shopprocards">
                  {loading ? (
                    <Spinner />
                  ) : publishedData.length === 0 ? (
                    <div>
                      <h2>Comming Soon !</h2>
                      <p>
                        We're working on adding exciting products. Stay tuned!
                      </p>
                    </div>
                  ) : (
                    publishedData.map((pro) => {
                      return (
                        <Link
                          href={`/shop/${pro.slug}`}
                          key={pro._id}
                          className="spprocard"
                          data-aos="flip-left"
                        >
                          <div className="spprocardimg">
                            <img src={pro.images[0]} alt={pro.title} />
                          </div>
                          <div className="spprocinfo">
                            <h2>{pro.title}</h2>
                            <h3>{pro.price}</h3>
                            <div className="spprotags">
                              {pro.tags.map((tag) => {
                                return <span key={tag}>{tag}</span>;
                              })}
                            </div>
                            <p>{formaDate(createdAtDate)}</p>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
