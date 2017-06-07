import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../model/user';

@Injectable()
export class UserService {

    // private urlAllUsers = 'api/users';
    private urlAllUsers = '/api/users/users';
    // /users/nameByUuid"
    // private urlNameByUuid = 'api/nameByUuid';
    private urlNameByUuid = '/api/users/users/nameByUuid';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    private extractData(res: Response): Array<any> {
        const body = res.json();
        return body || {};
    }

  private extractData2(res: Response): Array<any> {
    const body = res.json();
    console.log(body);
    return body || {};
  }
    getAllUsers(): Observable<any> {
        const options = new RequestOptions({headers: this.headers});
        return this.http.get(this.urlAllUsers, options)
            .map(this.extractData)
            .catch((error: any) => {return Observable.throw(error); });
    }

    getNameByUuid(uuids: Set<string>): Observable<User[]> {
        const options = new RequestOptions({headers: this.headers});
        // TODO Replace for real user-microservice
        let request = '{"uuid":[';
        uuids.forEach(uuid => (
            request = request + '"' + uuid + '",'
        ));
        request = (request + ']}').replace(',]', ']');
        console.log(request);
        return this.http.post(this.urlNameByUuid, request, options)
        // return this.http.get(this.urlNameByUuid, options)
            .map(this.extractData2)
            .catch((error: any) => {return Observable.throw(error); });
    }
}

