import { Injectable } from "@angular/core";
import { ApplicationHttpClient } from "../http/applicationHttpClientService.service";
import { Observable, of } from "rxjs";
import { Wallet } from "./models/wallet.model";
import { WalletChartResult } from "./models/walletChartResult.model";
import { WalletChangeSave } from "./models/walletChangeSave.model";
import { map } from "rxjs/operators";

@Injectable()
export class WalletService {

    constructor(private http: ApplicationHttpClient) {
    }

    saveChange(data: WalletChangeSave) {
        return this.http.post('walletChange/save', data);
    }

    getWalletsIds(): Observable<number[]> {
        return this.http.get<number[]>('wallet/getAllIds');
    }

    getAllWallets(): Observable<Wallet[]> {
        return this.http.get<Wallet[]>('wallet/getAll');
    }

    getWallet(id: number): Observable<Wallet> {
        return this.http.get<Wallet>(`wallet/getWithChanges/${id}`);
    }

    getWalletChartOld(id: number): Observable<WalletChartResult> {
        return of(
            {
                data: {
                    labels: [1, '', '', '', '', '', '', '', '', 10, '', '', '', '', '', '', '', '', '', 20, '', '', '', '', '', '', '', '', '', 30, ''],
                    datasets: [
                        {
                            label: 'Styczeń',
                            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40, 32],
                            // backgroundColor: '#ff638478'
                        },
                        {
                            label: 'Luty',
                            data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
                            // backgroundColor: '#28a7457a'
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Wallet history',
                        fontSize: 16
                    },
                    legend: {
                        postition: 'bottom'
                    }
                }
            });
    }

    getWalletChart(id: number): Observable<WalletChartResult> {
        return this.http.get<any>(`wallet/primaryChart/${id}`).pipe(
            map(res => {
                return {
                    data: {
                        labels: [1, '', '', '', '', '', '', '', '', 10, '', '', '', '', '', '', '', '', '', 20, '', '', '', '', '', '', '', '', '', 30, ''],
                        datasets: res,
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Wallet history',
                            fontSize: 16
                        },
                        legend: {
                            postition: 'bottom'
                        }
                    }
                }
            })
        );
    }

    save(): Observable<any> {
        return 
    }

}
