import { GrUserSettings } from "react-icons/gr";
import { MdAccountCircle } from "react-icons/md";
import LoginLayout from "@/components/LoginLayout";

export default function Setting() {
  return (
    <>
      <LoginLayout>
        <div className="settingpage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Admin <span>Settings</span>
              </h2>
              <h3>Admin Panel</h3>
            </div>
            <div className="breadcrumb">
              <GrUserSettings />
              <span> /</span> <span>Settings</span>
            </div>
          </div>
          <div className="profilesettings ">
            <div className="leftprofile_details flex flex-col">
              <img src="/img/coder.png" alt="coder" />
              <div className="w-100">
                <div className="flex flex-sb flex-left mt-2">
                  <h2>My profile:</h2>
                  <h3>
                    Shiva Rama Krishna
                    <br /> Developer
                  </h3>
                </div>
                <div className="flex flex-sb mt-2">
                  <h3>Phone:</h3>
                  <input type="text" defaultValue={"+91 8247595081"} />
                </div>
                <div className="mt-2">
                  <input
                    type="email"
                    defaultValue={"shivachowdary753@gmail.com"}
                  />
                </div>
                <div className="flex flex-center w-100 mt-2">
                  <button>Save</button>
                </div>
              </div>
            </div>
            <div className="rightlogoutsec">
              <div className="topaccountbox">
                <h2 className="flex flex-sb">
                  My Account <MdAccountCircle />
                </h2>
                <hr />
                <div className="flex flex-sb mt-1">
                  <h3>
                    Active Account <br /> <span>Email</span>
                  </h3>
                  <button>Log Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoginLayout>
    </>
  );
}
