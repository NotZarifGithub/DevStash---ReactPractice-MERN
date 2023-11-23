import { useSelector } from "react-redux";
import Sidebar from "../components/common/Sidebar";
import { useState, useEffect } from "react";

const Project = () => {

  const { currentUser } = useSelector((state) => state.user)
  const [projectInfo, setProjectInfo] = useState([])
  

  useEffect(() => {
    // Define the function inside the useEffect
    const getProjectInfo = async () => {
      try {
        const res = await fetch(`/api/user/list/${currentUser._id}`);
        const data = await res.json();
        setProjectInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function immediately
    getProjectInfo();
  }, []);
  
  return (
    <main className="md:flex max-w-[1200px] mx-auto py-[40px] flex-col gap-10">

      {/* page name */}
      <section className="px-[20px]">
        <h1 className="text-2xl font-semibold uppercase text-black/80">
          project
        </h1>
      </section>
      
      <section className="flex">
        
        <div className="hidden lg:inline-block">
          <Sidebar />
        </div>
    
        {/* profile info */}
        <section className="px-[20px] w-full md:px-[30px] py-[20px] md:py-0 flex flex-col gap-8">

          {projectInfo && projectInfo.length > 0 && 
          projectInfo.map((item, index) => (
            <section 
              key={item._id}
              className="w-full border rounded-lg shadow-md p-[30px] justify-center items-center gap-8 md:justify-between md:p-[30px] lg:px-[50px] flex flex-col lg:flex-row lg:items-start"
            >
            
            {/* info */}
            <div className="flex flex-col h-full md:gap-4 lg:flex-1">
              <div className="flex flex-col gap-4 md:border-b md:flex-row md:items-center md:justify-between py-[20px] border-black">
                <div className="tracking-[5px] text-sm font-semibold md:hidden">
                  0{index + 1}
                </div>
                <h1 className="font-semibold -tracking-[3px] text-2xl max-w-[200px] leading-9 md:text-3xl md:max-w-[300px] capitalize">
                  {item.projectName}
                </h1>
                <div className="tracking-[5px] text-sm font-semibold md:inline-flex hidden w-[100px] justify-center border-l border-black h-full items-center">
                  0{index + 1}
                </div>
              </div>
              <p className="text-sm tracking-[2px] text-black capitalize">
                {item.description}
              </p>
            </div>

            {/* image */}
            <div className="flex items-center h-full lg:flex-1">
              <img 
                src={item.imageUrls[0]} 
                alt="image" 
                className="border rounded-xl drop-shadow-2xl shadow-lg border-black w-[400px]"
              />
            </div>
          </section>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Project;
