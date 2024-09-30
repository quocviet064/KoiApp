import FengShui from "@/components/local/default/FengShui"
import HomeHero from "@/components/local/default/HomeHero"

function Home() {
  return (
    <div>
      <HomeHero />
      <div className="px-20">
        <FengShui />
      </div>
    </div>
  )
}
export default Home
