import {Component} from '@angular/core';
import {GamificationService}            from '../../service/gamification.service';
import {UserDetails}                     from "../../model/userDetails";

@Component({
    selector: 'user-details-table',
    templateUrl: 'app/components/user-details-table/user-details-table.component.html',
    styleUrls: ['app/components/user-details-table/user-details-table.component.css'],
})

export class UserDetailsTableComponent {
    title = 'User Details Table';
    userDetails : UserDetails[] = [];
    isUserDetails = false;

    constructor(private gamificationService: GamificationService) {}

    getUserDetails(uuid: string) {
        this.gamificationService.getUserDetails(uuid)
            .subscribe(data  => {this.userDetails = data[0];
            console.log(this.userDetails);
            this.isUserDetails = true;})
    }
}
