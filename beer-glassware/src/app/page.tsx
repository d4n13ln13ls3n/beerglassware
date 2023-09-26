import Image from 'next/image'
import { Hero } from '../../components'
import SearchBar from '../../components/SearchBar'

export default function Home() {
  return (
    <main className="overflow-hidden w-[70%] h-[85%] rounded-lg overflow-y-scroll no-scrollbar">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__filters'>
          {/* <SearchBar /> */}
        </div>
      </div>
    </main>
  )
}
