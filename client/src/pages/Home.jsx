
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom'
import ComponentSlider from "../components/animation/ComponentSlider";

const Home = () => {
  const [currentHero, setCurrentHero] = useState(0);

  const heroSectionData = [
    {
      title: 'Elevate Your Projects with DevStash',
      desc: 'Unlock the full potential of your projects with DevStash. Organize and store your project securely — all in one place.',
    },
    {
      title: 'Seamless Project Management, Simplified Storage',
      desc: 'Discover a new era of project management. DevStash combines powerful features with user-friendly storage for a superior experience.',
    },
    {
      title: 'DevStash: Your Secure Project Repository',
      desc: "Welcome to DevStash, where your projects are more than just files—they're securely housed, easily accessible, and ready to flourish.",
    },
    {
      title: 'Safely Store, Swiftly Soar: DevStash Unveiled',
      desc: 'Swiftly soar with DevStash, your trusted companion for safely storing your projects. Secure storage, swift access – the key to your continuous success.',
    },
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHero((prevIndex) => (prevIndex + 1) % heroSectionData.length);
    }, 4000);

    return () => clearInterval(intervalId);

  }, []);

  return (
    <main className="max-w-[1400px] mx-auto px-[20px] py-[50px] md:py-[20px] lg:py-[50px]">

      <section className="flex flex-col md:gap-12 md:flex-row md:h-[600px] items-center h-[300px]">

        <AnimatePresence mode="wait"> 
            <motion.div
              key={currentHero}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col flex-1 gap-8 max-w-[450px]" 
            >
              <ComponentSlider >
                <motion.h1
                  key={currentHero}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl font-black md:text-3xl lg:text-6xl"
                >
                  {heroSectionData[currentHero].title}
                </motion.h1>
              </ComponentSlider>
              
              <ComponentSlider delay={0.3}>
                <motion.p
                  key={currentHero}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:text-lg"
                >
                  {heroSectionData[currentHero].desc}
                </motion.p>
              </ComponentSlider>
            </motion.div>  
        </AnimatePresence>

        {/* cta */}
        
        <ComponentSlider delay={0.8}>
          <motion.button
            className="uppercase border py-[10px] px-[20px] rounded-xl shadow-sm drop-shadow-md max-w-[400px]"
            initial={{boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",}}
            whileHover={{
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
              transition:{ duration: 0.2, ease: "easeInOut" }
              
            }}
          >
            <Link
              to={'/sign-in'}
            >
              get started
            </Link>
          </motion.button>
        </ComponentSlider>

        {/* hero image */}
        <div className="flex-1">
          <ComponentSlider delay={1.4}> 
            <div 
              className="hidden border shadow-md md:flex rounded-2xl"
            >
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/devstash-aaee7.appspot.com/o/image_2023-11-25_003202292.png?alt=media&token=8d96d82e-f7ce-44d2-8759-358e0224be6f" 
                alt="" 
                className="border shadow-md md:flex rounded-2xl drop-shadow-xl"
              />
            </div>
          </ComponentSlider>
        </div>
      </section>
    </main>
  );
};

export default Home;
