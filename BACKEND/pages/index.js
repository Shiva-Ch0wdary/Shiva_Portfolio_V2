import Head from "next/head";
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading";
import { IoHome } from "react-icons/io5";
import { Chart as Chartjs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import LoginLayout from "@/components/LoginLayout";

export default function Home() {
  Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const [experiencesData, setExperiencesData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Experience Created Monthly by year',
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, projectsRes, shopsRes, photosRes] = await Promise.all([
          fetch(`${baseUrl}/api/blogs`),
          fetch(`${baseUrl}/api/projects`),
          fetch(`${baseUrl}/api/shops`),
          fetch(`${baseUrl}/api/photos`),
        ]);

        if (!blogsRes.ok || !projectsRes.ok || !shopsRes.ok || !photosRes.ok) {
          throw new Error('One or more API requests failed');
        }

        const data = await blogsRes.json();
        const dataProject = await projectsRes.json();
        const dataShop = await shopsRes.json();
        const dataPhotos = await photosRes.json();

        setExperiencesData(data || []);
        setProjectsData(dataProject || []);
        setShopData(dataShop || []);
        setPhotosData(dataPhotos || []);
      } catch (error) {
        console.error('Fetch data failed:', error);
        setExperiencesData([]);
        setProjectsData([]);
        setShopData([]);
        setPhotosData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  const monthlyData = experiencesData
    .filter((dat) => dat.status === "publish")
    .reduce((acc, experience) => {
      const year = new Date(experience.createdAt).getFullYear();
      const month = new Date(experience.createdAt).getMonth();
      acc[year] = acc[year] || Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const years = Object.keys(monthlyData);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const chartData = {
    labels,
    datasets,
  };

  if (loading) {
    return (
      <div className="flex flex-col flex-center wh_100">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    );
  }

  return (
    <LoginLayout>
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
              <span>{experiencesData.filter((dat) => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h3>Projects</h3>
              <span>{projectsData.filter((dat) => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h3>Shops</h3>
              <span>{shopData.filter((dat) => dat.status === 'publish').length}</span>
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
                <h3 className="text-right">
                  {experiencesData.filter((dat) => dat.status === 'publish').length} / 365 <br />
                  <span>Total Publishes</span>
                </h3>
              </div>
              <Bar data={chartData} options={options} />
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
                      <td>{experiencesData.filter((dat) => dat.experiencecategory[0] === "Next js").length}</td>
                    </tr>
                    <tr>
                      <td>React Js</td>
                      <td>{experiencesData.filter((dat) => dat.experiencecategory[0] === "React js").length}</td>
                    </tr>
                    <tr>
                      <td>Software developer</td>
                      <td>{experiencesData.filter((dat) => dat.experiencecategory[0] === "Software developer").length}</td>
                    </tr>
                    <tr>
                      <td>Java</td>
                      <td>{experiencesData.filter((dat) => dat.experiencecategory[0] === "Java").length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </LoginLayout>
  );
}
