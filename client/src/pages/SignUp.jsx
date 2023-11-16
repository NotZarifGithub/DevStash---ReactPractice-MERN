import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

  // variants for button components
  const buttonVariants = {
    hover: {
      scale: 1.05, 
      transition: {
        ease: [0.65, 0, 0.35, 1],
        duration: 0.3
      },
    } 
  }

  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  // function for handling input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
    console.log(formData) 
  }

  // function for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
      } else {
        setLoading(false);
        setError(null);
        navigate('/sign-in')
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  

  return (
    <main>
      <section className="max-w-[1200px] mx-auto px-[20px] flex items-center justify-center h-[calc(100vh-300px)]">

        {/* card */}
        <div className="flex flex-col items-center justify-center w-full border rounded-xl px-[30px] py-[50px] shadow-sm max-w-[500px] mx-auto gap-8">
           
          {/* text */}
          <div className="">
            <h1 className="capitalize tracking-[7px] text-lg font-semibold lg:text-3xl">
              sign up
            </h1>  
          </div>

          {/* forms */}
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 max-w-[350px]" method="post">
            <input 
              type="text" 
              id="username"
              name="username"
              autoComplete="on"
              placeholder="username" 
              className=" border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none"
              onChange={handleChange}
            />
            <input 
              type="text" 
              id="email"
              name="email"
              autoComplete="on"
              placeholder="email" 
              className=" border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none"
              onChange={handleChange}
            />
            <input 
              type="password" 
              id="password"
              name="password"
              placeholder="password" 
              className=" border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none"
              onChange={handleChange}
            />

            {/* submit button */}
            <motion.button 
              type="submit" 
              className="border rounded-xl p-[5px] capitalize -tracking-[1px] bg-black text-white"
              variants={buttonVariants}
              whileHover="hover"
            >
              {loading ? "loading..." : "Sign Up"}
            </motion.button>

            {/* google auth button */}
            <motion.button 
              type="submit"  
              className="border rounded-xl p-[5px] capitalize flex justify-center items-center -tracking-[1px] gap-2"
              variants={buttonVariants}
              whileHover="hover"
            >
              <FcGoogle />
              continue with google
            </motion.button>

            {/* redirect to sign in page if the user already has an account */}
            <div className="text-xs lg:text-sm">
              Have an account? <Link to={'/sign-in'} className="hover:font-black">Sign In</Link>
            </div>
          </form>
          {error && <p className="mt-5 text-red-500">{error}</p>}
        </div>
      </section>
    </main>
  )
}

export default SignUp