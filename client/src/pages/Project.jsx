import { useSelector } from "react-redux";
import Sidebar from "../components/common/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Project = () => {

  const { currentUser } = useSelector((state) => state.user)
  const [projectInfo, setProjectInfo] = useState([])
  

  useEffect(() => {

    const getProjectInfo = async () => {
      try {
        const res = await fetch(`/api/user/list/${currentUser._id}`);
        const data = await res.json();
        setProjectInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjectInfo();
  }, [currentUser._id]);

  const handleDeleteList = async (listId) => {
    try {
      const res = await fetch(`/api/list/delete/${listId}`, {
        method: 'DELETE',
        
      });
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }
      setProjectInfo((prev) => prev.filter((list) => list._id !== listId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateList = async (listId) => {
    try {
      const res = await fetch(`/api/list/update/${listId}`, {
        method: 'UPDATE',
      })
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
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
                <Link 
                  className="font-semibold -tracking-[3px] text-2xl max-w-[200px] leading-9 md:text-3xl md:max-w-[300px] capitalize"
                  to={{}}
                >
                  {item.projectName}
                </Link>
                <div className="tracking-[5px] text-sm font-semibold md:inline-flex hidden w-[100px] justify-center border-l border-black h-full items-center">
                  0{index + 1}
                </div>
              </div>
              <p className="text-sm tracking-[2px] text-black capitalize italic">
                {item.description}
              </p>

              {/* delete edit button */}
              <div className="flex-col items-start justify-between hidden w-full pt-[30px] md:flex">
                <motion.button 
                  className="text-sm capitalize"
                  initial={{letterSpacing: "6px"}}
                  whileHover={{
                    letterSpacing: "1px",
                    color: 'red',
                  }}
                  onClick={() => handleDeleteList(item._id)}
                >
                  delete
                </motion.button>
                <Link
                  to={`/update-list/${item._id}`}
                >
                  <motion.button 
                    className="text-sm capitalize"
                    initial={{letterSpacing: "6px"}}
                    whileHover={{
                      letterSpacing: "1px",
                      color: "green"
                    }}
                    onClick={handleUpdateList}
                  >
                    edit
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* image */}
            <div className="flex items-center pt-[20px] lg:flex-1">
              <img 
                src={item.imageUrls[0]} 
                alt="image" 
                className="border rounded-xl drop-shadow-2xl shadow-lg border-black w-[400px]"
              />
            </div>

            {/* delete edit button */}
            <div className="flex flex-col items-end justify-between w-full md:hidden">
              <motion.button 
                className="text-sm capitalize"
                initial={{letterSpacing: "6px"}}
                whileHover={{
                  letterSpacing: "1px",
                  color: 'red',
                }}
                onClick={() => handleDeleteList(item._id)}
              >
                delete
              </motion.button>
              <motion.button 
                className="text-sm capitalize"
                initial={{letterSpacing: "6px"}}
                whileHover={{
                  letterSpacing: "1px",
                  color: "green"
                }}
              >
                edit
              </motion.button>
            </div>
          </section>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Project;
