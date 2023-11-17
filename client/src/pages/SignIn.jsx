import SignCard from "../components/common/SignCard"

const SignIn = () => {
  return (
    <main>
      <section className="max-w-[1200px] mx-auto px-[20px] flex items-center justify-center h-[calc(100vh-300px)]">

      {/* card */}
        <SignCard signIn={true}/>
      </section>
    </main>
  )
}

export default SignIn