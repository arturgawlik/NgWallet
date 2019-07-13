import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SubjectService {
    private subject = new Subject<any>();

    sendMessage(message: any) {
        this.subject.next(message);
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

