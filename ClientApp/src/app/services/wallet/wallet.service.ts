import { Injectable } from "@angular/core";
import { ApplicationHttpClient } from "../http/applicationHttpClientService.service";
import { Observable, of } from "rxjs";
import { Wallet } from "./models/wallet.model";
import { WalletChartResult } from "./models/walletChartResult.model";

@Injectable()
export class WalletService {

    constructor(private http: ApplicationHttpClient) {
    }

    getWalletsIds(): Observable<number[]> {
        return this.http.get<number[]>('wallet/getAllIds');
    }

    getWallet(id: number): Observable<Wallet> {
        // return this.http.get<Wallet>(`wallet/getWallet/${id}`)
        return of({
            id: 1,
            name: 'Portfel testowy',
            currentState: 150,
            currency: 'zł',
            walletChanges: [{
                id: 1,
                value: 200,
                date: '20.03.2019',
                description: 'od babci'
            },
            {
                id: 2,
                value: -300,
                date: '20.03.2019',
                description: 'koka hera hasz lsd'
            }]
        });
    }

    getWalletChart(id: number): Observable<WalletChartResult> {
        return of(
            {
                data: {
                    labels: ['1', '', '', '', '', '', '', '', '', 10, '', '', '', '', '', '', '', '', '', 20, '', '', '', '', '', '', '', '', '', 30, ''],
                    datasets: [
                        {
                            label: 'First Dataset',
                            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40, 32]
                        },
                        {
                            label: 'Second Dataset',
                            data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40]
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

}
