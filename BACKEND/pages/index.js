import Head from "next/head";
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading";
import { IoHome } from "react-icons/io5";
import { Chart as Chartjs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';
import { useEffect, useState } from "react";
import LoginLayout from "@/components/LoginLayout";


export default function Home() {

  Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const [experiencesData, setExperiencesData] = useState([]);
  const [ProjectsData, setProjectsData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Experience Created Monthly by year'
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/experiences');
        const responseproject = await fetch('/api/projects');
        const responseShop = await fetch('/api/shops');
        const responseGallery = await fetch('/api/photos');

        const data = await response.json();
        const dataProject = await responseproject.json();
        const dataShop = await responseShop.json();
        const dataPhotos = await responseGallery.json();

        setExperiencesData(data);
        setProjectsData(dataProject);
        setShopData(dataShop);
        setPhotosData(dataPhotos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  const monthlyData = experiencesData.filter(dat => dat.status === "publish").reduce((acc, experience) => {
    const year = new Date(experience.createdAt).getFullYear();
    const month = new Date(experience.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`
  }));

  const data = {
    labels,
    datasets
  }

  return (
    //  <LoginLayout>
      <>
        <Head>
          <title>Portfolio Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2> Admin <span> Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <IoHome /><span>/</span><span>Dashboard</span>
            </div>
          </div>

          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h3>Experiences</h3>
              <span>{experiencesData.filter(dat => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h3>Projects</h3>
              <span>{ProjectsData.filter(dat => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h3>Shops</h3>
              <span>{shopData.filter(dat => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h3>Gallery Photos</h3>
              <span>{photosData.length}</span>
            </div>
          </div>

          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">{experiencesData.filter(dat => dat.status === 'publish').length} / 365 <br /> <span>Total Publishes</span></h3>
              </div>
              <Bar data={data} options={options} />
            </div>

            <div className="right_salescont">
              <div>
                <h3>Experience by Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="experiencescategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Next Js</td>
                      <td>{experiencesData.filter(dat => dat.experiencecategory[0] === "Next js").length}</td>
                    </tr>
                    <tr>
                      <td>React Js</td>
                      <td>{experiencesData.filter(dat => dat.experiencecategory[0] === "React js").length}</td>
                    </tr>
                    <tr>
                      <td>Software developer</td>
                      <td>{experiencesData.filter(dat => dat.experiencecategory[0] === "Software developer").length}</td>
                    </tr>
                    <tr>
                      <td>Java</td>
                      <td>{experiencesData.filter(dat => dat.experiencecategory[0] === "Java").length}</td>
                    </tr>
                    {/* <tr>
                    <td>Python</td>
                    <td>{experiencesData.filter(dat => dat.experiencecategory[0] === "Python").length}</td>
                  </tr>
                  <tr>
                    <td>Database</td>
                    <td>{experiencesData.filter(dat => dat.experiencecategory[0] === "Database").length}</td>
                  </tr>
                  <tr>
                    <td>Flutter Dev</td>
                    <td>{experiencesData.filter(dat => dat.experiencecategory[0] === "Flutter Dev").length}</td>
                  </tr> */}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    // </LoginLayout>
  );



}
