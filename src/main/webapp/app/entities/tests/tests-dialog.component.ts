import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tests } from './tests.model';
import { TestsPopupService } from './tests-popup.service';
import { TestsService } from './tests.service';
import { Patient, PatientService } from '../patient';
import { Doctor, DoctorService } from '../doctor';
import { Visit, VisitService } from '../visit';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tests-dialog',
    templateUrl: './tests-dialog.component.html'
})
export class TestsDialogComponent implements OnInit {

    tests: Tests;
    isSaving: boolean;

    patients: Patient[];

    doctors: Doctor[];

    visits: Visit[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testsService: TestsService,
        private patientService: PatientService,
        private doctorService: DoctorService,
        private visitService: VisitService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.patientService.query()
            .subscribe((res: ResponseWrapper) => { this.patients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.doctorService.query()
            .subscribe((res: ResponseWrapper) => { this.doctors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.visitService.query()
            .subscribe((res: ResponseWrapper) => { this.visits = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tests.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testsService.update(this.tests));
        } else {
            this.subscribeToSaveResponse(
                this.testsService.create(this.tests));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tests>) {
        result.subscribe((res: Tests) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tests) {
        this.eventManager.broadcast({ name: 'testsListModification', content: 'OK'});
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

    trackVisitById(index: number, item: Visit) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tests-popup',
    template: ''
})
export class TestsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testsPopupService: TestsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testsPopupService
                    .open(TestsDialogComponent as Component, params['id']);
            } else {
                this.testsPopupService
                    .open(TestsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
