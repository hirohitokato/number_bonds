import { createContext, ReactNode, useState } from 'react';
import * as XLSX from 'xlsx';

// コンテキストで管理する状態とその更新関数の型定義
export interface ExcelDataContextType {
    workBook: XLSX.WorkBook | null;
    setWorkBook: React.Dispatch<React.SetStateAction<XLSX.WorkBook | null>>;
}

// コンテキストの初期値はundefinedにして、Providerの使用を強制する
// Warning: Fast refresh only works when a file only exports components.
//          Move your React context(s) to a separate file.eslint(react-refresh/only-export-components)
// FIXME: このContextだけ別ファイルに切り出して、開発時のReact動作効率を高める
export const ExcelDataContext = createContext<ExcelDataContextType | undefined>(undefined);

// Providerコンポーネントのpropsの型定義
interface ExcelDataProviderProps {
    children: ReactNode;
}

export const ExcelDataProvider: React.FC<ExcelDataProviderProps> = ({ children }) => {
    const [workBook, setWorkBook] = useState<XLSX.WorkBook | null>(null);

    return <ExcelDataContext.Provider value={{ workBook, setWorkBook }}>{children}</ExcelDataContext.Provider>;
};
