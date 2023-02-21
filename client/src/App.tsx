import React from 'react';
import { Register } from './components';

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen">
      <Register />
    </div>
  );
};

export default App;
