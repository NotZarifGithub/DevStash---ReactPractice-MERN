import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from '../firebase'

const CreateList = () => {

  const imageFileRef = useRef(null)
  const navigate = useNavigate()
  const [file, setFile] = useState([])
  const [error, setError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false)
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    imageUrls: [],
  })
  const { currentUser } = useSelector((state) => state.user)
  
  
  const handleChange = (e) => {
    const {id, value} = e.target

    setFormData({
      ...formData,
      [id]: value,
    })
    console.log(formData)
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress} done`)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((donwloadURL) => {
              resolve(donwloadURL)
            })
            .catch((error) => {
              reject(error)
            })
        }
      )
    })
  }

  const handleImageSubmit = () => {
    console.log('handleImageSubmit triggered');
    if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          console.log('Image URLs:', urls);
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/list/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user: currentUser._id,
        }),
      });
      const data = await res.json()
      console.log('Backend Response:', data)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/project/${data._id}`)
      
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }
  

  return (
    <main className="md:flex max-w-[1200px] mx-auto py-[40px] flex-col gap-10">

      {/* store your project */}
      <section className="px-[20px] capitalize flex flex-col gap-8 py-[20px] relative">
        <div className=" tracking-[10px] w-[200px] md:text-lg md:w-[300px] lg:text-xl">
          add a new project
        </div>
        <form 
          className="flex flex-col gap-6 max-w-[650px]"
          onSubmit={handleSubmit}
        >
          
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
              id="projectName"
              name="project name"
              autoComplete="off"
              className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
              maxLength={64}
              minLength={10}
              required
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          {/* image input */}
          <div className="flex flex-col justify-between gap-5 md:flex-row">

              <input
                type="file"
                ref={imageFileRef}
                hidden
                accept="image/.*"
                multiple
                id="imageInput" 
                name="description"
                className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                onChange={(e) => {
                  setFile(e.target.files)
                }}
              />
              <div className="flex flex-col gap-1 md:gap-4">
                <motion.button
                  type="button"
                  className="border rounded-lg py-[5px] px-[10px] capitalize font-semibold bg-black text-white shadow-md md:h-[50px] w-[200px]"
                  onClick={async () => {
                    await imageFileRef.current.click(),
                    handleImageSubmit()
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                choose image
                </motion.button>
                <p className="text-xs md:text-sm text-black/70">
                {file.length === 0 ? "first image will be the cover (max-6)" : `${file.length} images selected`}
                </p>
              </div>
            <button
              type='button'
              onClick={handleImageSubmit}
              className='border rounded-lg py-[5px] px-[10px] capitalize font-semibold border-black bg-white text-black shadow-md hover:shadow-lg md:h-[50px] w-[200px]'
            >
              upload
            </button>
            
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
          
          {/* shows selected image */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex flex-col justify-between gap-6 border-b border-black/50 md:flex-row py-[40px] md:gap-4"
              >
                <img 
                src={url} 
                alt="" 
                className="border rounded-xl drop-shadow-2xl shadow-lg border-black w-[400px]"
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className="text-sm md:text-sm text-red-700 capitalize w-[150px] hover:font-bold transition-all duration-100 ease-in text-start md:text-end"
              >
                Delete
              </button>
             </div>
            ))}
        </form>
      </section>
    </main>
  )
}

export default CreateList