import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Ailment } from './ailment.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AilmentService {

    private resourceUrl = SERVER_API_URL + 'api/ailments';

    constructor(private http: Http) { }

    create(ailment: Ailment): Observable<Ailment> {
        const copy = this.convert(ailment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ailment: Ailment): Observable<Ailment> {
        const copy = this.convert(ailment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ailment> {
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
     * Convert a returned JSON object to Ailment.
     */
    private convertItemFromServer(json: any): Ailment {
        const entity: Ailment = Object.assign(new Ailment(), json);
        return entity;
    }

    /**
     * Convert a Ailment to a JSON which can be sent to the server.
     */
    private convert(ailment: Ailment): Ailment {
        const copy: Ailment = Object.assign({}, ailment);
        return copy;
    }
}
