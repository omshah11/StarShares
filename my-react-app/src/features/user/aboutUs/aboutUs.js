// Import necessary dependencies
import React from 'react';
import Logo from '../../../Imgs/starsharesLogo.png';
// About Us page component
const AboutUs = () => {
  return (
    <div className='bg-blueGray-200  my-auto bgcolorSS h-full w-full mx auto flex flex-col'>
      <section className="py-10  dark:text-gray-100">
        <div className="container flex flex-col mx-auto lg:flex-row">
          <div className="w-full lg:w-1/3" style={{backgroundImage: "url('https://www.schwab.com/learn/sites/g/files/eyrktu1246/files/Getty_500706310_3x2.jpg')", backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
          <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 dark:text-violet-400">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <h2 className="text-3xl font-semibold leadi">A Stock Market App for Music Lovers</h2>
            <p className="mt-4 mb-8 text-sm">Finally.</p>
            <button className="self-start px-10 py-3 text-lg font-medium rounded-3xl bgcolorSS whiteSS">Get started</button>
          </div>
        </div>
      </section>
      
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>

      <section class=" ">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-1 shadow-lg rounded-lg">
                <div class="px-4 flex-auto">
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center mt-16">
            <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i class="fas fa-user-friends text-xl"></i>
              </div>
              <h3 class="text-3xl mb-2 font-semibold leading-normal">
                Revolutionizing the way you consume music.
              </h3>
              <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Star Shares pioneers a revolutionary fusion of music and finance, allowing users to invest
                in popular musical artists as tradable assets. 
                  The value of artist stocks is determined by a sophisticated algorithm, 
                  which analyzes Spotify stream popularity and past song playback ratios to 
                  create a real-time popularity metric that reflects the artist's current standing. 
              </p>
              <p class="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                By leveraging the volatility of the music industry, users can strategically manage 
                their portfolios, taking advantage of market trends to maximize their investments.
              </p>
              <a href="#" class="font-bold text-blueGray-700 mt-8">Invest Today!</a>
            </div>
            <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div class="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg bgcolorSS">
                <img alt="..." src="https://altoona.psu.edu/sites/altoona/files/styles/top_feature_area/public/adobestock-234251371_0.jpg?itok=cQKldOme&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1051&amp;q=80" class="w-full align-middle rounded-t-lg"/>
                <blockquote class="relative p-8 mb-4">
                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" class="absolute left-0 w-full block h-95-px -top-94-px">
                          <polygon points="-30,95 583,95 583,65" class="bgcolorSStext  fill-current"></polygon>
                        </svg>
              
                  <h4 class="text-xl font-bold text-white">
                    Our Community
                  </h4>
                  <p class="text-md font-light mt-2 text-white">
                    StarShares embraces its community of artists and music lovers. 
                    With transparency as our main goal, we foster trust and accountability
                    with thorough reporting, ensuring stakeholders have a clear view of earnings 
                    and performance. 
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <footer class="relative pt-8 pb-6 mt-8">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap items-center md:justify-between justify-center">
              <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                
              </div>
            </div>
          </div>
        </footer>
      </section>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20  ">
        <h2 className="mb-8 text-4xl font-bold leadi text-center">What do we Bring to you?</h2>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-400">
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Music Previews</span>
          </li> 
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-400">
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Reliable Service </span>
          </li>
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-400">
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Secure Transactions</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-400">
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Transparency and Loyalty</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-400">
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>Music Finds</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-400">
              <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
              <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
            </svg>
            <span>A supporting community </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
