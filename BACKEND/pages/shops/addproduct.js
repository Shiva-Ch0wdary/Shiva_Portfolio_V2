import Shop from "@/components/Shop";
import { FaShoppingCart } from "react-icons/fa";
import LoginLayout from "@/components/LoginLayout";

export default function Addproduct() {
  return (
    <>
      <LoginLayout>
        <div className="addexperiencespage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                {" "}
                Add <span> Products</span>
              </h2>
              <h3>Admin Panel</h3>
            </div>
            <div className="breadcrumb">
              <FaShoppingCart /> <span>/</span> <span>Add Products</span>
            </div>
          </div>
          <div className="experiencesadd">
            <Shop />
          </div>
        </div>
      </LoginLayout>
    </>
  );
}
