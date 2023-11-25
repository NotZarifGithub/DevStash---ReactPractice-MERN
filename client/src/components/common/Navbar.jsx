import { TbBinaryTree } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { IoReorderTwoOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux";
import { useState } from "react";
import ComponentSlider from "../animation/ComponentSlider";

const Navbar = () => {

  const { currentUser } = useSelector((state) => state.user)
  const [isHamburgerActive, setIsHamburgerActive]  = useState(false)

  return (
    <header className="">
      <section className="max-w-[1200px] mx-auto flex justify-between items-center p-[20px] z-20">

        {/* logo */}
        <Link className="flex items-center gap-3" to={'/'}>
          <TbBinaryTree className="text-2xl"/>
          <h1 className="hidden text-lg font-medium md:inline-block -tracking-[1px]">
            DevStash
          </h1>
        </Link>

        {/* search button */}
        <form action="" className="flex items-center p-[5px] rounded-xl border shadow-sm ">
          <input 
            type="text" 
            placeholder="search"
            className="bg-transparent focus:outline-none px-[10px] w-[100px] md:w-[200px] lg:w-[300px]"
          />
          <CiSearch />
        </form>

        {/* navlinks */}
        <div className="md:w-[120px] flex items-center">
          
          {/* links */}
          <div className="items-center hidden gap-2 md:flex">
            <Link 
              className="" 
              to={'/profile'}
            >
              {currentUser ? (
                <img 
                  src={currentUser.avatar} 
                  alt="user image" 
                  className="rounded-xl w-[50px]"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{scale: 1.2 }}
                  >
                    <CiLogin className="text-xl"/>
                  </motion.div>
                  <h1 
                    className="text-lg font-medium -tracking-[1px]"
                  >
                    Sign in
                  </h1>
                </div>
              )} 
            </Link> 
          </div>
          
          {/* hamburger link */}
          <motion.button 
            className=" md:hidden"
            onClick={() => setIsHamburgerActive(!isHamburgerActive)}  
          >
            <IoReorderTwoOutline className="justify-end w-full text-3xl"/>
          </motion.button>
        </div>
      </section>
      
      <AnimatePresence mode="wait"> 
        
        {/* hamburger link dropdown */}
        {isHamburgerActive && (
          <motion.div 
            className="absolute top-[56px] bg-white h-[calc(100vh-56px)] w-full z-10 flex flex-col justify-center items-center gap-5 pb-[200px]"
            initial={{x: 300}}
            animate={{x: 0}}
            exit={{x: 300}}
            transition={{
              duration: 0.5,
              ease: [0.61, 1, 0.88, 1]
            }}
          >
            
            {/* home button */}
            <ComponentSlider delay={0.2}>
              <motion.button
                className="uppercase border py-[10px] px-[20px] rounded-xl shadow-sm drop-shadow-md max-w-[400px] bg-white w-[150px]"
                initial={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",}}
                whileHover={{
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                  transition:{ duration: 0.2, ease: "easeInOut" }
                  
                }}
                onClick={() => setIsHamburgerActive(!isHamburgerActive)}
              >
                <Link
                  to={'/'}
                >
                  home
                </Link>
              </motion.button>
            </ComponentSlider>
            
            
            {/* sign in button */}
            <ComponentSlider delay={0.5}>
              <motion.button
                className="uppercase border py-[10px] px-[20px] rounded-xl shadow-sm drop-shadow-md max-w-[400px] bg-white w-[150px]"
                initial={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",}}
                whileHover={{
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                  transition:{ duration: 0.2, ease: "easeInOut" }
                  
                }}
                onClick={() => setIsHamburgerActive(!isHamburgerActive)}
              >
                <Link
                  to={'/sign-in'}
                >
                  sign-in
                </Link>
              </motion.button>   
            </ComponentSlider>
            

            {/* sign up button */}
            <ComponentSlider delay={0.8}>
              <motion.button
                className="uppercase border py-[10px] px-[20px] rounded-xl shadow-sm drop-shadow-md max-w-[400px] bg-white w-[150px]"
                initial={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",}}
                whileHover={{
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                  transition:{ duration: 0.2, ease: "easeInOut" }
                  
                }}
                onClick={() => setIsHamburgerActive(!isHamburgerActive)}
              >
                <Link
                  to={'/sign-up'}
                >
                  sign-up
                </Link>
              </motion.button>  
            </ComponentSlider>
          </motion.div>
        )}
      </AnimatePresence>
      
    </header>
  )
}

export default Navbar