import Sidebar from "../components/common/Sidebar"


const Project = () => {
  return (
    <main className="md:flex max-w-[1200px] mx-auto py-[40px] flex-col gap-10">
      
      <section className="px-[20px] w-full md:px-[30px] py-[20px] md:py-0 flex flex-col gap-3">
        <Sidebar />
      </section>
    </main>
  )
}

export default Project