
import './App.css'

import Register from './components/register/Register'

function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/' element={<><Navbar /><Home /></>} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
