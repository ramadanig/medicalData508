import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Prescription } from './prescription.model';
import { PrescriptionPopupService } from './prescription-popup.service';
import { PrescriptionService } from './prescription.service';
import { Medication, MedicationService } from '../medication';
import { Patient, PatientService } from '../patient';
import { Doctor, DoctorService } from '../doctor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-prescription-dialog',
    templateUrl: './prescription-dialog.component.html'
})
export class PrescriptionDialogComponent implements OnInit {

    prescription: Prescription;
    isSaving: boolean;

    medications: Medication[];

    patients: Patient[];

    doctors: Doctor[];
    expirationDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private prescriptionService: PrescriptionService,
        private medicationService: MedicationService,
        private patientService: PatientService,
        private doctorService: DoctorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.medicationService.query()
            .subscribe((res: ResponseWrapper) => { this.medications = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.patientService.query()
            .subscribe((res: ResponseWrapper) => { this.patients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.doctorService.query()
            .subscribe((res: ResponseWrapper) => { this.doctors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prescription.id !== undefined) {
            this.subscribeToSaveResponse(
                this.prescriptionService.update(this.prescription));
        } else {
            this.subscribeToSaveResponse(
                this.prescriptionService.create(this.prescription));
        }
    }

    private subscribeToSaveResponse(result: Observable<Prescription>) {
        result.subscribe((res: Prescription) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Prescription) {
        this.eventManager.broadcast({ name: 'prescriptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMedicationById(index: number, item: Medication) {
        return item.id;
    }

    trackPatientById(index: number, item: Patient) {
        return item.id;
    }

    trackDoctorById(index: number, item: Doctor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-prescription-popup',
    template: ''
})
export class PrescriptionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prescriptionPopupService: PrescriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.prescriptionPopupService
                    .open(PrescriptionDialogComponent as Component, params['id']);
            } else {
                this.prescriptionPopupService
                    .open(PrescriptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
