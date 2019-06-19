import { Injectable } from "@angular/core";
import { ToastrService, GlobalConfig } from "ngx-toastr";

@Injectable()
export class MessageService {

    constructor(private toastr: ToastrService) {
    }

    success(title: string, message: string) {
        this.toastr.success(message, title);
    }

    error(title: string, message: string) {
        this.toastr.error(message, title);
    }

}