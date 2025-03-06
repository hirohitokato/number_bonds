import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import { ExcelData, ExcelDataContext } from './provider/ExcelDataProvider';

import './ExcelDropzone.css';

function ExcelDropzone() {
    // Excelファイルから読み取ったデータはJSONでContextに保持
    const context = useContext(ExcelDataContext);
    if (!context) {
        throw new Error('ExcelDataContext is undefined. Ensure you are using it.');
    }
    const { setExcelData } = context;

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

            const reader = new FileReader();

            // ファイル読み込み完了時の処理
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const binaryStr = e.target?.result;
                if (binaryStr) {
                    // xlsxライブラリでファイルを読み込む（バイナリ文字列として）
                    const workbook = XLSX.read(binaryStr, { type: 'binary' });

                    // 指定のシート名「シート２」が存在するかチェック
                    if (!workbook.SheetNames.includes('Sheet2')) {
                        setError('"Sheet2" というシートが見つかりませんでした');
                        return;
                    }

                    const worksheet = workbook.Sheets['Sheet2'];
                    // JSONに変換。初期行をキーとする形に変換する場合はheaderオプションを省略
                    const jsonResult = XLSX.utils.sheet_to_json(worksheet) as ExcelData[];
                    setExcelData(jsonResult);
                }
            };

            // ファイル読み込みエラー時の処理
            reader.onerror = () => {
                setError('ファイル読み込み中にエラーが発生しました');
            };

            // バイナリ文字列としてファイルを読み込み、onloadをトリガーする
            reader.readAsArrayBuffer(file);
        },
        [setExcelData]
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
