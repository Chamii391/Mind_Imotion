import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/header';
import PrdictPage from './predicts/predictpage';
import Footer from './components/footer';
import Home from './pages/home';
import About from './pages/about';
import ContactPage from './pages/contact';




function App() {

  return (
    <>

 
    
      <Router>

       <Navbar/>

       
        
        <Routes>
        
            <Route path="/predict-page/*" element={<PrdictPage />} />
            <Route path="/" element={<Home  />} />
             <Route path="/about" element={<About  />} />
              <Route path="/contact" element={<ContactPage />} />
             
        
          
        </Routes>

        <Footer />

      </Router>


     
    </>
  )
}

export default App