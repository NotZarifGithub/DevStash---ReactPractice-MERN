import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Sidebar = () => {

  const profileData = [
    {
      link: "account settings",
      info: "details about your personal information",
      path: "/profile"
    },
    {
      link: "project list",
      info: "details about your personal information",
      path: "/project"
    },
    {
      link: "other",
      info: "details about your personal information",
      path: "/"
    },
  ]

  const [isActive, setIsActive] = useState(false)
  
  return (
    <section className="px-[20px] flex-col gap-3 hidden md:flex">
          
          {/* button */}
          {profileData.map((item, index) => (
            <motion.div
              key={index}
              className="max-w-[300px] mx-auto"
              whileHover={{
                scale: 1.05,
              }}
            >
              <Link 
                to={item.path}
                className="inline-flex flex-col items-center justify-center capitalize border rounded-lg shadow-md px-[20px] py-[5px]"
                onMouseEnter={() => index === 1 && setIsActive(true)}
                onMouseLeave={() => index === 1 && setIsActive(false)}
              >
                <h1 className="font-semibold">
                  {item.link}
                </h1>
                <p className="text-xs text-center text-black/80">
                  {item.info}
                </p>
                
              </Link>

              {/* if cursor hover on the project list, button create listing will pop up */}
              {index === 1 && isActive && (
                <motion.div
                  className="text-xs uppercase border rounded-lg md:text-sm py-[5px] px-[10px] z-10"
                  whileHover={{
                    fontWeight: "bold", 
                    borderColor: "black"
                  }}
                  onMouseEnter={() => index === 1 && setIsActive(true)}
                  onMouseLeave={() => index === 1 && setIsActive(false)}
                >
                  <Link
                    to={"/create-list"}
                  >
                    create list 
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
        </section>
  )
}

export default Sidebar