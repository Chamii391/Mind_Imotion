import { Link, Route, Routes } from "react-router-dom";




export default function PrdictPage() {
    return (
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] flex flex-col ">
                <Link to ="/predict-page/products" className="hover:text-gray-400">Products</Link>
                <Link to ="/predict-page/users" className="hover:text-gray-400">Users</Link>
                <Link to ="/predict-page/orders" className="hover:text-gray-400">Orders</Link>
                <Link to ="/predict-page/reviews" className="hover:text-gray-400">Reviews</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)]">

                <Routes pathe ="/*">
               
                    <Route path="/products" element={<h1>Products</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
          
                  
                  
                </Routes>
            </div>

        </div>
    );
}