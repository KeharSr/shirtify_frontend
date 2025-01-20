// import React, { useEffect, useState } from 'react';
// import { getAllProductsApi } from "../../apis/Apis";
// import Navbar from '../../components/Navbar';
// import Hero from '../../components/Hero';
// import Products from '../../components/Products';
// import Banner from '../../components/Banner';
// import { ArrowRightIcon } from 'lucide-react';
// import Footer from '../../components/Footer';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [randomLink, setRandomLink] = useState('');

//   useEffect(() => {
//     getAllProductsApi()
//       .then((res) => {
//         if (res.status === 201) {
//           setProducts(res.data.products);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     setRandomLink(Math.random() < 0.5 ? '/shortsleeves' : '/longsleeves');
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <Hero />
//         <section className="mt-16 mb-12">
//           <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
//           <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-6">
//             {products.slice(0, 3).map((singleProduct) => (
//               <div key={singleProduct._id} className="w-full sm:w-1/4 max-w-sm">
//                 <Products 
//                   productInformation={singleProduct} 
//                   color={'red'}
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-8">
//             <a 
//               href={randomLink} 
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               View All Products
//               <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
//             </a>
//           </div>
//         </section>
//         <Banner />
//         <Footer />
//       </main>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { getAllProductsApi } from "../../apis/Apis";
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Products from '../../components/Products';
import Banner from '../../components/Banner';
import { ArrowRightIcon } from 'lucide-react';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomLink, setRandomLink] = useState('');

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Randomly set the link to either '/shortsleeves' or '/longsleeves'
    setRandomLink(Math.random() < 0.5 ? '/shortsleeves' : '/longsleeves');
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <section className="mt-16 mb-12">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8">
            {products.slice(0, 3).map((singleProduct) => (
              <div key={singleProduct._id} className="w-full sm:w-1/4 max-w-sm">
                <Products 
                  productInformation={singleProduct} 
                  color={'red'}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to={randomLink} // Use `to` for dynamic navigation
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Products
              <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </section>
        <Banner />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
