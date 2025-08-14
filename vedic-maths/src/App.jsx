import React from 'react'
import HeaderBar from './components/Header'
import SutraCard from './components/SutraCard'
import Footer from './components/Footer'
import './styles/index.css' // Ensure your styles are imported
import sutras from './data/Sutras'

const App = () => {
  return (
    <div>
    <HeaderBar />
       <div className=" py-10 px-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {sutras.map((sutra) => (
          <SutraCard
            key={sutra.id}
            name={sutra.name}
            sanskrit={sutra.sanskrit}
            description={sutra.description}
            linkTo={`/sutras/${sutra.id}`}
          />
        ))}
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default App