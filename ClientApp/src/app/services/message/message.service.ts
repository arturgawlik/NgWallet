import { Injectable } from "@angular/core";
import { ToastrService, GlobalConfig } from "ngx-toastr";
import { NotyfToast } from "./notyfy.toast";

@Injectable()
export class MessageService {

    options: GlobalConfig;

    constructor(private toastr: ToastrService) {
        this.options = this.toastr.toastrConfig;
    }

    success(title: string, message: string) {
        this.toastr.success(message, title);
    }

    error(title: string, message: string) {
        this.toastr.error(message, title);
    }

}