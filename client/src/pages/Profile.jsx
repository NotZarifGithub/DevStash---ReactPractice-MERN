import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import Sidebar from '../components/common/Sidebar'

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import ComponentSlider from "../components/animation/ComponentSlider";

const Profile = () => {

  const { currentUser, error } = useSelector((state) => state.user)
  const imageFileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch(); 

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    // Set a timeout to hide the error message after 3000 milliseconds (3 seconds)
    let timeoutId;

    if (fileUploadError) {
      timeoutId = setTimeout(() => {
        setFileUploadError(false);
      }, 3000);
    }

    // Cleanup the timeout when the component is unmounted or when fileUploadError changes
    return () => clearTimeout(timeoutId);
  }, [fileUploadError]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
    
          // Set a timeout to hide the success message after 3000 milliseconds (3 seconds)
          setTimeout(() => {
            setFilePercentage(0);
          }, 3000);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    } finally {
      
      // Set a timeout to clear messages after 3 seconds
      setTimeout(() => {
        dispatch(updateUserFailure('')); // Clear the error message
        setUpdateSuccess(false); // Clear the success message
      }, 3000);
    }
  };

  const handleDeleteUser = async () => {

    const userConfirmed = window.confirm("Are you sure you want to delete your account?");
    
    if (userConfirmed) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
  }

  const handleSignOutUser = async () => {
    
    const userConfirmed = window.confirm("Are you sure you want to sign out?")

    if (userConfirmed) {
      try {
        dispatch(signOutUserStart())
        const res = await fetch("/api/auth/sign-out")
        const data = await res.json()
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data));
      } catch (error) {
          dispatch(signOutUserFailure(error.message))
      }
    }
  }
  
  return (
    <main className="md:flex max-w-[1200px] mx-auto py-[40px] flex-col gap-10">

      {/* page name */}
      <section className="px-[20px]">
        <h1 className="text-2xl font-semibold uppercase text-black/80">
          profile
        </h1>
      </section>
      
      <section className="flex">
        <Sidebar />

        {/* profile info */}
        <section className="px-[20px] w-full md:px-[30px] py-[20px] md:py-0 flex flex-col gap-3">

          <ComponentSlider delay={1.4}> 
            <section className="w-full border rounded-lg shadow-md p-[30px] justify-center items-center flex flex-col gap-10 md:flex-row md:justify-between md:p-[30px] lg:px-[50px]">

              {/* profile image */}
              <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12">
                <img 
                  src={formData.avatar || currentUser.avatar} 
                  alt="user image" 
                  className="rounded-lg w-[100px]"
                />

                {/* profile info */}
                <div>
                  <h1 className="text-base font-semibold capitalize -tracking-[2px] md:text-lg">
                    {currentUser.username}
                  </h1>
                  <h1 className="text-sm md:text-base">
                    software developer
                  </h1>
                </div>
              </div>


              <div className="flex-col items-center justify-center hidden md:flex">
                
                {/* button */}
                <motion.button
                  className="border rounded-lg py-[5px] px-[20px] capitalize font-semibold border-black bg-black text-white shadow-md hidden lg:flex"
                  onClick={() => imageFileRef.current.click()}
                  onChange={(e) => setFile(e.target.files[0])}
                  whileHover={{y: -5}}
                >
                  <input type="file" ref={imageFileRef} hidden accept="image/.*"/>
                  update picture
                </motion.button>
                
                <div className="flex">
                  {/* show error */}
                  {fileUploadError ? (
                    <span className='text-red-700'>
                      Error Image upload (image must be less than 2 mb)
                    </span>
                  ) : filePercentage > 0 && filePercentage < 100 ? (
                    <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
                  ) : filePercentage === 100 ? (
                    <span className='text-green-700'>Image successfully uploaded!</span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </section> 
          </ComponentSlider>
            
          {/* update profile info */}
          <ComponentSlider delay={1.9}> 
            <section className="w-full border rounded-lg shadow-md p-[20px] justify-center">

              {/* title */}
              <div className="flex text-start py-[10px]">
                <h1 className="text-sm font-semibold uppercase text-black/80 md:text-base lg:text-lg">
                  change user information here  
                </h1>  
              </div>

              {/* forms */}
              <form 
                action=""
                onSubmit={handleSubmit}
                className="py-[10px] md:py-[20px] flex flex-col gap-4"
              >
                {/* name and email */}
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex flex-col w-full gap-2">
                    <label 
                      htmlFor="username"
                      className="text-sm font-semibold capitalize text-black/80 "
                    >full name</label>
                    <input 
                      type="text" 
                      id="username"
                      name="username"
                      autoComplete="off"
                      placeholder="username" 
                      className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                      defaultValue={currentUser.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <label 
                      htmlFor="email"
                      className="text-sm font-semibold capitalize text-black/80 "
                    >email</label>
                    <input 
                      type="text" 
                      id="email"
                      name="email"
                      autoComplete="off"
                      placeholder="email" 
                      className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                      defaultValue={currentUser.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* address */}
                <div className="flex flex-col w-full gap-2">
                  <label 
                    htmlFor="address"
                    className="text-sm font-semibold capitalize text-black/80 "
                  >address</label>
                  <input 
                    type="text" 
                    id="address"
                    name="address"
                    autoComplete="off"
                    placeholder="address" 
                    className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                    defaultValue={currentUser.address}
                    onChange={handleChange}
                  />
                </div>

              {/* city and state */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col w-full gap-2">
                  <label 
                    htmlFor="city"
                    className="text-sm font-semibold capitalize text-black/80 "
                  >city</label>
                  <input 
                    type="text" 
                    id="city"
                    name="city"
                    autoComplete="off"
                    placeholder="city" 
                    className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                    defaultValue={currentUser.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <label 
                    htmlFor="state"
                    className="text-sm font-semibold capitalize text-black/80 "
                  >state</label>
                  <input 
                    type="text" 
                    id="state"
                    name="state"
                    autoComplete="off"
                    placeholder="state" 
                    className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                    defaultValue={currentUser.state}  
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* zipcode and country */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col w-full gap-2">
                  <label 
                    htmlFor="zipcode"
                    className="text-sm font-semibold capitalize text-black/80 "
                  >zipcode</label>
                  <input 
                    type="text" 
                    id="zipcode"
                    name="zipcode"
                    autoComplete="off"
                    placeholder="zipcode" 
                    className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                    defaultValue={currentUser.zipcode}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <label 
                    htmlFor="country"
                    className="text-sm font-semibold capitalize text-black/80 "
                  >country</label>
                  <input 
                    type="text" 
                    id="country"
                    name="country"
                    autoComplete="off"
                    placeholder="country" 
                    className={`border rounded-xl py-[5px] px-[10px] shadow-sm focus:outline-none `}
                    defaultValue={currentUser.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
                    
              <section className="flex items-center w-full lg:py-[10px]  justify-evenly">
                
                {/* delete account button */}
                <motion.button 
                  className="text-xs md:text-sm text-red-700 capitalize w-[150px] hover:font-bold transition-all duration-100 ease-in"
                  onClick={handleDeleteUser}
                >
                  delete account
                </motion.button>
                
                {/* submit form button */}
                <motion.button
                  type="submit"
                  className="border rounded-lg py-[5px] capitalize font-semibold border-black bg-black text-white shadow-md w-full max-w-[100px] mx-auto"
                  whileHover={{scale: 0.95}}
                >
                  submit
                </motion.button>

                {/* sign out button */}
                <motion.button 
                  className="text-xs md:text-sm text-red-700 capitalize w-[150px] hover:font-bold transition-all duration-100 ease-in"
                  onClick={handleSignOutUser}
                >
                  sign out
                </motion.button>
              </section>

              <div className="flex flex-col text-center">
                <p className='text-sm text-red-700'>{error ? error : ''}</p>
                <p className='text-sm text-green-700'>
                  {updateSuccess ? 'User is updated successfully!' : ''}
                </p>
              </div>
                
              </form>

            </section>
          </ComponentSlider>
          
        </section>
      </section>
      
    </main>
  )
}

export default Profile;
