import { TbBinaryTree } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { IoReorderTwoOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useSelector } from "react-redux";

const Navbar = () => {

  const { currentUser } = useSelector((state) => state.user)

  return (
    <header className="">
      <section className="max-w-[1200px] mx-auto flex justify-between items-center p-[20px]">

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
          <button className="md:hidden" >
            <IoReorderTwoOutline className="justify-end w-full text-3xl"/>
          </button>
        </div>
      </section>
    </header>
  )
}

export default Navbar