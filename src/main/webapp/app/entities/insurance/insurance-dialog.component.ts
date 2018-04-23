import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Insurance } from './insurance.model';
import { InsurancePopupService } from './insurance-popup.service';
import { InsuranceService } from './insurance.service';
import { Patient, PatientService } from '../patient';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-insurance-dialog',
    templateUrl: './insurance-dialog.component.html'
})
export class InsuranceDialogComponent implements OnInit {

    insurance: Insurance;
    isSaving: boolean;

    patients: Patient[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private insuranceService: InsuranceService,
        private patientService: PatientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.patientService
            .query({filter: 'insurance-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.insurance.patient || !this.insurance.patient.id) {
                    this.patients = res.json;
                } else {
                    this.patientService
                        .find(this.insurance.patient.id)
                        .subscribe((subRes: Patient) => {
                            this.patients = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.insurance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.insuranceService.update(this.insurance));
        } else {
            this.subscribeToSaveResponse(
                this.insuranceService.create(this.insurance));
        }
    }

    private subscribeToSaveResponse(result: Observable<Insurance>) {
        result.subscribe((res: Insurance) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Insurance) {
        this.eventManager.broadcast({ name: 'insuranceListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-insurance-popup',
    template: ''
})
export class InsurancePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private insurancePopupService: InsurancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.insurancePopupService
                    .open(InsuranceDialogComponent as Component, params['id']);
            } else {
                this.insurancePopupService
                    .open(InsuranceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
