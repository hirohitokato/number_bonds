import { createContext, ReactNode, useState } from 'react';

// 読み込んだExcelデータの型定義（任意に拡張可能）
export interface ExcelData {
    [key: string]: any;
}

// コンテキストで管理する状態とその更新関数の型定義
export interface ExcelDataContextType {
    excelData: ExcelData | null;
    setExcelData: React.Dispatch<React.SetStateAction<ExcelData | null>>;
}

// コンテキストの初期値はundefinedにして、Providerの使用を強制する
export const ExcelDataContext = createContext<ExcelDataContextType | undefined>(undefined);

// Providerコンポーネントのpropsの型定義
interface ExcelDataProviderProps {
    children: ReactNode;
}

export const ExcelDataProvider: React.FC<ExcelDataProviderProps> = ({ children }) => {
    const [excelData, setExcelData] = useState<ExcelData | null>(null);

    return <ExcelDataContext.Provider value={{ excelData, setExcelData }}>{children}</ExcelDataContext.Provider>;
};
