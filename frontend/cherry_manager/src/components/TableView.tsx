import { useContext } from 'react';
import { ExcelDataContext } from './provider/ExcelDataProvider';

import './ExcelDropzone.css';

function TableView() {
    // Excelファイルから読み取ったデータはJSONでContextに保持
    const context = useContext(ExcelDataContext);
    if (!context) {
        throw new Error('ExcelDataContext is undefined. Ensure you are using it.');
    }
    const { excelData } = context;

    return (
        <>
            {/* JSONデータの表示。preタグで整形済みテキストとして出力 */}
            <h3>読み出したJSONデータ:</h3>
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                {JSON.stringify(excelData, null, 2)}
            </pre>
        </>
    );
}

export default TableView;
