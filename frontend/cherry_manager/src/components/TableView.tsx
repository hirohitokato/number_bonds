import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ExcelDataContext } from './provider/ExcelDataProvider';
import * as XLSX from 'xlsx';

import './TableView.css';

type DataItem = {
    name: string;
    use_add: boolean;
    use_sub: boolean;
    carry_over: boolean;
    num_questions: number;
};

function excelToJson(sheet: XLSX.WorkSheet): DataItem[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return XLSX.utils.sheet_to_json(sheet).map((row: any) => {
        return {
            name: row['名前'],
            use_add: row['足し算'] ? true : false,
            use_sub: row['引き算'] ? true : false,
            carry_over: row['繰り上がり/繰り下がり'] ? true : false,
            num_questions: row['問題数']
        };
    });
}

function TableView() {
    // JSONデータをDataContextから取得。データが更新された場合にも自動で再レンダリングされます。
    const { workBook } = useContext(ExcelDataContext);
    // 各行のチェック状態をbooleanの配列として状態管理。
    // JSONの行数に合わせた初期値はuseEffectで設定しています。
    const [selectedRows, setSelectedRows] = useState<boolean[]>([]);

    const [data, setData] = useState<DataItem[]>([]);

    // jsonが更新されるたびにselectedRowsの初期値を設定。
    // これにより、データが変更されたときにチェック状態をリセットできます。
    useEffect(() => {
        if (!workBook) {
            return;
        }
        // workBookからデータを読み込み

        // 指定のシート名「シート２」が存在するかチェック
        if (!workBook.SheetNames.includes('Sheet2')) {
            // setError('"Sheet2" というシートが見つかりませんでした');
            return;
        }

        const worksheet = workBook.Sheets['Sheet2'];
        // JSONに変換。初期行をキーとする形に変換する場合はheaderオプションを省略
        const jsonResult = excelToJson(worksheet);
        setData(jsonResult);
        setSelectedRows(jsonResult.map(() => true));
    }, [workBook]);

    // 全行が選択されているかを判定。行がない場合はfalseとする。
    const allSelected = data.length > 0 && selectedRows.every((selected) => selected);

    // ヘッダーのチェックボックスの変更イベント
    // ヘッダーのチェックボックスをトグルすると、すべての行のチェック状態が一括で更新されます。
    const handleHeaderCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setSelectedRows(selectedRows.map(() => newChecked));
    };

    // 各行のチェックボックスの変更イベント
    const handleRowCheckboxChange = (index: number, checked: boolean) => {
        const newSelectedRows = [...selectedRows];
        newSelectedRows[index] = checked;
        setSelectedRows(newSelectedRows);
    };
    // 行クリック時のハンドラー
    // 行全体がクリックされた場合、該当行のチェック状態をトグルします。
    const handleRowClick = (index: number) => {
        handleRowCheckboxChange(index, !selectedRows[index]);
    };

    // ボタンクリック時の処理
    const handleButtonClick = () => {
        // チェックされた行だけを抽出
        const selectedData = data.filter((_, index) => selectedRows[index]);
        // JSON文字列に変換
        const jsonString = JSON.stringify(selectedData);
        // URLエンコードしてクエリパラメータとして付与
        const url = `http://localhost:8000/cherry?num_sheets=4&data=${encodeURIComponent(jsonString)}`;
        // 新しいウィンドウでgoogle.comへ遷移
        window.open(url, '_blank');
    };

    // ボタンを有効にする条件：１つでもチェックが入っていれば有効
    const isButtonEnabled = selectedRows.some((selected) => selected);

    return (
        <>
            {/* ボタン：チェックが1つ以上入っている場合にのみ有効 */}
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button
                    onClick={handleButtonClick}
                    disabled={!isButtonEnabled}
                    style={{
                        // padding: '12px 32px',
                        margin: '12px',
                        width: '60%',
                        fontSize: '16px',
                        cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
                        // 有効時は緑色、無効時はグレーに設定
                        backgroundColor: isButtonEnabled ? '#28a745' : '#cccccc',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#ffffff',
                        // 有効/無効を視覚的に区別するために透明度を設定
                        opacity: isButtonEnabled ? 1 : 0.6,
                        transition: 'background-color 0.3s, opacity 0.3s'
                    }}
                >
                    選択データを印刷
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            {/* ヘッダーのチェックボックスは、すべての行が選択されているかどうかで状態を反映 */}
                            <input type="checkbox" checked={allSelected} onChange={handleHeaderCheckboxChange} />
                        </th>
                        {/* JSONのキーを列名として固定（今回の仕様に合わせてハードコード） */}
                        <th>名前</th>
                        <th>足し算</th>
                        <th>引き算</th>
                        <th>繰り上(下)がり</th>
                        <th>問題数</th>
                    </tr>
                </thead>
                <tbody>
                    {/* JSONデータが空の場合、tbodyは空のままとなりヘッダーのみ表示 */}
                    {data.map((item: DataItem, index: number) => (
                        <tr key={index} onClick={() => handleRowClick(index)}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows[index] || false}
                                    // チェックボックス自体をクリックした場合は、行のonClickが発火しないように伝播を止める
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleRowCheckboxChange(index, e.target.checked)}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.use_add ? '✓' : ''}</td>
                            <td>{item.use_sub ? '✓' : ''}</td>
                            <td>{item.carry_over ? '✓' : ''}</td>
                            <td>{item.num_questions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TableView;
