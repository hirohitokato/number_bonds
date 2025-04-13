import './App.css';
import './components/ExcelDropzone';
import ExcelDropzone from './components/ExcelDropzone';
import { ExcelDataProvider } from './components/provider/ExcelDataProvider';
import TableView from './components/TableView';

function App() {
    return (
        <>
            <ExcelDataProvider>
                <ExcelDropzone />
                <TableView />
                <p className="read-the-docs">2025/03/12 プロトタイプ</p>
            </ExcelDataProvider>
        </>
    );
}

export default App;
