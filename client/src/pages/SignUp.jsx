import SignCard from "../components/common/SignCard"

const SignUp = () => {
  
  return (
    <main>
      <section className="max-w-[1200px] mx-auto px-[20px] flex items-center justify-center h-[calc(100vh-300px)]">

        {/* card */}
        <SignCard signUp={true} signIn={false}/>
      </section>
    </main>
  )
}

export default SignUp