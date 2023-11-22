import { useRef, useState } from "react"
import { motion } from "framer-motion"

const CreateListing = () => {

  const imageFileRef = useRef(null)
  const [file, setFile] = useState([])
  
  return (
    <main className="md:flex max-w-[1200px] mx-auto py-[40px] flex-col gap-10">

      {/* store your project */}
      <section className="px-[20px] capitalize flex flex-col gap-8 py-[20px] relative">
        <div className=" tracking-[10px] w-[200px] md:text-lg md:w-[300px] lg:text-xl">
          add a new project
        </div>
        <form className="flex flex-col gap-6 max-w-[650px]">
          
          {/* project name input */}
          <div className="flex flex-col gap-4">
            <label 
              htmlFor="project name"
              className="text-sm font-semibold capitalize text-black/80 "
            >
              project name
            </label>
            <input 
              type="text" 
              id="project name"
              name="project name"
              autoComplete="off"
              className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
              maxLength={64}
              minLength={10}
              required
            />
          </div>

          {/* description input */}
          <div className="flex flex-col gap-4">
            <label 
              htmlFor="description"
              className="text-sm font-semibold capitalize text-black/80 "
            >
              description
            </label>
            <input 
              type="text" 
              id="description"
              name="description"
              autoComplete="off"
              className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
              required
            />
          </div>

          {/* image input */}
          <div className="flex flex-col gap-2">
            <motion.button
              type="button"
              className="border rounded-lg py-[5px] px-[20px] capitalize font-semibold border-black bg-black text-white shadow-md inline-block max-w-[200px]"
              onClick={() => imageFileRef.current.click()}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="file"
                ref={imageFileRef}
                hidden
                accept="image/.*"
                multiple
                id="imageInput" 
                name="description"
                className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                onChange={(e) => setFile(e.target.files)}
              />
              add image
            </motion.button>
            <p className="text-sm text-black/70">
              first image will be the cover (max-6)
            </p>
          </div>

          {/* submit button */}
          <div className="absolute top-[30px] right-[20px] md:right-[50px]">
            <motion.button
              type="submit"
              className="border rounded-lg py-[5px] px-[20px] capitalize font-semibold border-black bg-black text-white shadow-md md:w-[200px] md:h-[50px]"
              whileHover={{ scale: 1.02 }}
            > 
              submit
            </motion.button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateListing