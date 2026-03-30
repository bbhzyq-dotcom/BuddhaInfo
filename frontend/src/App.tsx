import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Detail from './pages/Detail'
import Search from './pages/Search'
import Contribute from './pages/Contribute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="character/:id" element={<Detail />} />
        <Route path="search" element={<Search />} />
        <Route path="contribute" element={<Contribute />} />
      </Route>
    </Routes>
  )
}

export default App
