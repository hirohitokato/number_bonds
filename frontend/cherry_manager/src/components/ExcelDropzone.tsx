import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { ExcelDataContext } from './provider/ExcelDataProvider';

import './ExcelDropzone.css';

function ExcelDropzone() {
    // Excelファイルから読み取ったデータはJSONでContextに保持
    const context = useContext(ExcelDataContext);
    if (!context) {
        throw new Error('ExcelDataContext is undefined. Ensure you are using it.');
    }
    const { setWorkBook } = context;

    // エラーメッセージをstateに保持しておき、表示に用いる
    const [error, setError] = useState<string>('');

    // ドロップ時のコールバック（useCallbackで再生成を抑制）
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setError(''); // 既存のエラーはリセット
            const file = acceptedFiles[0];

            // ファイルの拡張子チェック（.xlsx, .xlsのみ許可）
            const allowedExtensions = /(\.xlsx|\.xls)$/i;
            if (!allowedExtensions.exec(file.name)) {
                setError('Excelファイル (.xlsx または .xls) のみサポートしています');
                return;
            }

            // Excelファイルの読み込み → Contextへの保存
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const binaryStr = e.target?.result;
                if (binaryStr) {
                    // xlsxライブラリでファイルを読み込む（バイナリ文字列として）
                    const wb = XLSX.read(binaryStr, { type: 'binary' });
                    // 読み込んだ結果をそのままContextで保持
                    setWorkBook(wb);
                }
            };
            reader.onerror = () => {
                setWorkBook(null);
                setError('ファイル読み込み中にエラーが発生しました');
            };

            // ファイルを実際に読み込み、onloadをトリガーする
            reader.readAsArrayBuffer(file);
        },
        [setWorkBook]
    );

    // useDropzone のフックでドラッグ＆ドロップ領域の各プロパティを取得
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false // 単一ファイルのみを受け付ける
    });

    return (
        <>
            <div {...getRootProps()} className="dnd-zone">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>ここにファイルをドロップしてください...</p>
                ) : (
                    <p>ここにExcelファイルをドラッグ＆ドロップするか、クリックしてファイルを選択してください</p>
                )}
                {/* エラーメッセージ表示 */}
                <p className="error-message">{error}</p>
            </div>
        </>
    );
}

export default ExcelDropzone;
