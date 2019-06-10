import { Component, OnChanges } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    templateUrl: './navbar.component.html',
    selector: 'app-nav-bar',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    
    searchInput = null;
    
    constructor(public authService: AuthService) {
    }

    searchValueChanged(event: any) {
        console.log(this.searchInput);
    }

    logout() {
        this.authService.doLogout();
    }

}