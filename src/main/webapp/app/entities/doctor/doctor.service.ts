import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Doctor } from './doctor.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DoctorService {

    private resourceUrl = SERVER_API_URL + 'api/doctors';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(doctor: Doctor): Observable<Doctor> {
        const copy = this.convert(doctor);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(doctor: Doctor): Observable<Doctor> {
        const copy = this.convert(doctor);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Doctor> {
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
     * Convert a returned JSON object to Doctor.
     */
    private convertItemFromServer(json: any): Doctor {
        const entity: Doctor = Object.assign(new Doctor(), json);
        entity.birthdate = this.dateUtils
            .convertLocalDateFromServer(json.birthdate);
        entity.startDate = this.dateUtils
            .convertLocalDateFromServer(json.startDate);
        return entity;
    }

    /**
     * Convert a Doctor to a JSON which can be sent to the server.
     */
    private convert(doctor: Doctor): Doctor {
        const copy: Doctor = Object.assign({}, doctor);
        copy.birthdate = this.dateUtils
            .convertLocalDateToServer(doctor.birthdate);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(doctor.startDate);
        return copy;
    }
}
