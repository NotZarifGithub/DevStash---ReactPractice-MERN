import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice.js";
import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types";

const SignCardPage = ({ signIn, signUp }) => {

  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  SignCardPage.propTypes = {
    signIn: PropTypes.bool.isRequired,
    signUp: PropTypes.bool.isRequired,
  };

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

  // function for handling input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    }) 
  }

  // functions for handling different components routes
  const signUpRoute = {
    route: "/api/auth/sign-up",
    navigation: "/sign-in"
  }

  const signInRoute = {
    route: "/api/auth/sign-in",
    navigation: "/"
  }
  
  // function for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${signUp ? signUpRoute.route : signInRoute.route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate(`${signUp ? signUpRoute.navigation : signInRoute.navigation}`);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full border rounded-xl px-[30px] py-[50px] shadow-sm max-w-[500px] mx-auto gap-8">
           
          {/* text */}
          <div className="">
            <h1 className="capitalize tracking-[7px] text-lg font-semibold lg:text-3xl">
              {signIn ? "Sign In" : "Sign Up"}
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
              className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none ${signUp ? "" : "hidden"}`}
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
              {loading ? "loading..." : `${signIn ? "Sign In" : "Sign Up"}`}
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
              {signUp ? "Already have an account?" : "Don't have an account?"} <Link to={`${signIn ? "/sign-up" : "/sign-in"}`} className="hover:font-black">{signUp ? "Sign In" : "Sign Up"}</Link>
            </div>
          </form>
          {error && <p className="mt-5 text-red-500">{error}</p>}
        </div>
  )
}

export default SignCardPage