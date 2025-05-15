import PromptInput from "../components/promptInput.js"
import PrevPodcasts from "../components/prevPodcasts.js"

function Home() {
  return (
    <div>
      <PromptInput/>
      <hr className='max-w-screen h-1 border-t-1 border-gray-300'/>
      <PrevPodcasts/>
      <hr className='max-w-screen h-1 border-t-1 border-gray-300'/>
    </div>
  )
}

export default Home
