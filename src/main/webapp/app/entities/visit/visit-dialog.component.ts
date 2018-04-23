import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Visit } from './visit.model';
import { VisitPopupService } from './visit-popup.service';
import { VisitService } from './visit.service';
import { Patient, PatientService } from '../patient';
import { Doctor, DoctorService } from '../doctor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-visit-dialog',
    templateUrl: './visit-dialog.component.html'
})
export class VisitDialogComponent implements OnInit {

    visit: Visit;
    isSaving: boolean;

    patients: Patient[];

    doctors: Doctor[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private visitService: VisitService,
        private patientService: PatientService,
        private doctorService: DoctorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.patientService
            .query({filter: 'visit-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.visit.patient || !this.visit.patient.id) {
                    this.patients = res.json;
                } else {
                    this.patientService
                        .find(this.visit.patient.id)
                        .subscribe((subRes: Patient) => {
                            this.patients = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.doctorService
            .query({filter: 'visit-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.visit.doctor || !this.visit.doctor.id) {
                    this.doctors = res.json;
                } else {
                    this.doctorService
                        .find(this.visit.doctor.id)
                        .subscribe((subRes: Doctor) => {
                            this.doctors = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.visit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.visitService.update(this.visit));
        } else {
            this.subscribeToSaveResponse(
                this.visitService.create(this.visit));
        }
    }

    private subscribeToSaveResponse(result: Observable<Visit>) {
        result.subscribe((res: Visit) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Visit) {
        this.eventManager.broadcast({ name: 'visitListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPatientById(index: number, item: Patient) {
        return item.id;
    }

    trackDoctorById(index: number, item: Doctor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-visit-popup',
    template: ''
})
export class VisitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitPopupService: VisitPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.visitPopupService
                    .open(VisitDialogComponent as Component, params['id']);
            } else {
                this.visitPopupService
                    .open(VisitDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
