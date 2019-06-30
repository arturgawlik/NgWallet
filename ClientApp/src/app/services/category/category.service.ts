import { Injectable } from "@angular/core";
import { ApplicationHttpClient } from "../http/applicationHttpClientService.service";
import { Observable } from "rxjs";
import { Category } from "./models/category.model";

@Injectable()
export class CategoryService {

    constructor(private http: ApplicationHttpClient) {
    }

    fetchAll(): Observable<Category[]> {
        return this.http.get<Category[]>('category/getAll');
    }

    save(entity: Category): Observable<any> {
        return this.http.post('category/save', entity);
    }

    remove(id: number): Observable<any> {
        return this.http.delete(`category/remove/${id}`);
    }

}
