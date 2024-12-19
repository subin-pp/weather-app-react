import React from 'react';
import MainContainer from './componets/MainContainer';
import background from './assets/background.jpg'; 
import InputBox from './componets/InputBox';

const App = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column gap-0"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // Prevents tiling
        width: '100%', // Ensures it spans the full width
        height: '100vh', // Full viewport height
        overflow: 'hidden', // Avoids overflow issues on smaller screens
      }}
    >
      <InputBox/>
      <MainContainer />
    </div>
  );
};

export default App;

