import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/header';
import PrdictPage from './predicts/predictpage';




function App() {

  return (
    <>

 
    
      <Router>

       <Navbar/>

       
        
        <Routes>
        
            <Route path="/predict-page/*" element={<PrdictPage />} />
        
          
        </Routes>


      </Router>


     
    </>
  )
}

export default App