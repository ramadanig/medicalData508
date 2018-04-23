import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Insurance } from './insurance.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InsuranceService {

    private resourceUrl = SERVER_API_URL + 'api/insurances';

    constructor(private http: Http) { }

    create(insurance: Insurance): Observable<Insurance> {
        const copy = this.convert(insurance);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(insurance: Insurance): Observable<Insurance> {
        const copy = this.convert(insurance);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Insurance> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Insurance.
     */
    private convertItemFromServer(json: any): Insurance {
        const entity: Insurance = Object.assign(new Insurance(), json);
        return entity;
    }

    /**
     * Convert a Insurance to a JSON which can be sent to the server.
     */
    private convert(insurance: Insurance): Insurance {
        const copy: Insurance = Object.assign({}, insurance);
        return copy;
    }
}
