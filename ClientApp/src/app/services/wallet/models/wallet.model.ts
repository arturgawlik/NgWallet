import { WalletChange } from './walletChange.model';

export interface Wallet {
    id: number;
    name: string;
    currentState: number;
    currency: string;
    description: string;
    defaultCategoryId: number;
    walletChanges: WalletChange[];
    fastAccess: boolean;
}
