import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Visit } from './visit.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class VisitService {

    private resourceUrl = SERVER_API_URL + 'api/visits';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(visit: Visit): Observable<Visit> {
        const copy = this.convert(visit);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(visit: Visit): Observable<Visit> {
        const copy = this.convert(visit);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Visit> {
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
     * Convert a returned JSON object to Visit.
     */
    private convertItemFromServer(json: any): Visit {
        const entity: Visit = Object.assign(new Visit(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Visit to a JSON which can be sent to the server.
     */
    private convert(visit: Visit): Visit {
        const copy: Visit = Object.assign({}, visit);
        copy.date = this.dateUtils
            .convertLocalDateToServer(visit.date);
        return copy;
    }
}
