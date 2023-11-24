import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const ComponentSlider = ({ delay, children}) => {

  const ref = useRef(null)
  const isInView = useInView(ref, {once: true})

  return (
    <motion.div
      ref={ref}
      initial={{
        y: 100,
        opacity: 0
      }}
      animate={{
        y: isInView ? 0 : null,
        opacity: isInView ? 1 : null,
        transition: {
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
          delay: delay
        }
      }}
     >
      {children}
    </motion.div>
  )
}

export default ComponentSlider