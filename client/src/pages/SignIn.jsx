import SignCard from "../components/ui/SignCard"

const SignIn = () => {
  return (
    <main>
      <section className="max-w-[1200px] mx-auto px-[20px] flex items-center justify-center h-[calc(100vh-300px)]">

      {/* card */}
        <SignCard signIn={true} signUp={false}/>
      </section>
    </main>
  )
}

export default SignIn