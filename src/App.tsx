import React, { useState } from 'react';

import './App.css';
import Select from './Components/Select/Select';
import Tags from './Components/Tags/Tags';

function App() {
  const  [list,setList] = useState<string[]>([])
  return (
    <div className='layout'>
      <Tags list={list} setList={setList}/>
      <Select list={list} setList={setList}/>
    </div>
  );
}

export default App;
