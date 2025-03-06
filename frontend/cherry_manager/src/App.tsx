import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './components/ExcelDropzone';
import ExcelDropzone from './components/ExcelDropzone';
import { ExcelDataProvider } from './components/provider/ExcelDataProvider';
import TableView from './components/TableView';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <ExcelDataProvider>
                <div>
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <ExcelDropzone />
                <TableView />
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            </ExcelDataProvider>
        </>
    );
}

export default App;
