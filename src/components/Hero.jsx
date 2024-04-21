import React from 'react';

const Hero = () => {
  return (
    <div className="relative py-12 md:py-20">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/corndog-background.jpg')` }}></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto text-center relative z-10">
        <div className="flex items-center justify-center mb-4">
          <img src="/frozen-icon.png" alt="Frozen Icon" className="h-12 md:h-16 mr-2" />
          <h1 className="font-fredoka-one text-3xl md:text-5xl text-white">Frozen Corndogs</h1>
        </div>
        <p className="text-lg md:text-xl text-white mb-8">Fry in Minutes, Enjoy Anytime!</p>
        {/* Replace the "Order Now" button with the arrow SVG icon */}
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 17.293l-7.354-7.354 1.414-1.414L10 14.465l5.94-5.94 1.415 1.414L10 17.293z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
