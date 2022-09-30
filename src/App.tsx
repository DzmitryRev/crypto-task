import React from 'react';
import Button from './components/Button';

function App() {
  return (
    <div>
      Hello world!
      <Button color="blue">
        portfolio
      </Button>
      <Button color="red">
        Close
      </Button>
      <Button color="green" action={() => { console.log('He'); }}>
        Add
      </Button>
    </div>
  );
}

export default App;
