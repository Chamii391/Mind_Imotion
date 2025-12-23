import { Link, Route, Routes } from "react-router-dom";
import SentimentalPage from "./sentimental";
import ImageGenPage from "./image";




export default function PrdictPage() {
    return (
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] flex flex-col ">
                <Link to ="/predict-page/sentiental" className="hover:text-gray-400">sentiental</Link>
                <Link to ="/predict-page/gen-image" className="hover:text-gray-400">Gen Image</Link>
                <Link to ="/predict-page/orders" className="hover:text-gray-400">Orders</Link>
                <Link to ="/predict-page/reviews" className="hover:text-gray-400">Reviews</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)]">

                <Routes pathe ="/*">
               
                    <Route path="/sentiental" element={<SentimentalPage />} />
                    <Route path="/gen-image" element={<ImageGenPage />} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
          
                  
                  
                </Routes>
            </div>

        </div>
    );
}