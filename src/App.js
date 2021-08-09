import React from 'react';
import Home from './components/Home';
import './App.css';
import { ReactComponent as Logo } from './assets/logo.svg';

function App() {
    return (
        <div className="App">
            <Logo style={{ height: '100px', width: '100px' }} />
            <Home name="Sammy" />
        </div>
    );
}

export default App;
