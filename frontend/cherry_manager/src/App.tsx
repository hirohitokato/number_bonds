import reactLogo from './assets/react.svg';
import './App.css';
import './components/ExcelDropzone';
import ExcelDropzone from './components/ExcelDropzone';
import { ExcelDataProvider } from './components/provider/ExcelDataProvider';
import TableView from './components/TableView';

function App() {
    return (
        <>
            <ExcelDataProvider>
                <div>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <ExcelDropzone />
                <TableView />
                <p className="read-the-docs">2025/03/12 プロトタイプ</p>
            </ExcelDataProvider>
        </>
    );
}

export default App;
