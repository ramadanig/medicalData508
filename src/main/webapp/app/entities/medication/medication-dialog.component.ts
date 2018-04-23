import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Medication } from './medication.model';
import { MedicationPopupService } from './medication-popup.service';
import { MedicationService } from './medication.service';

@Component({
    selector: 'jhi-medication-dialog',
    templateUrl: './medication-dialog.component.html'
})
export class MedicationDialogComponent implements OnInit {

    medication: Medication;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private medicationService: MedicationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.medication.id !== undefined) {
            this.subscribeToSaveResponse(
                this.medicationService.update(this.medication));
        } else {
            this.subscribeToSaveResponse(
                this.medicationService.create(this.medication));
        }
    }

    private subscribeToSaveResponse(result: Observable<Medication>) {
        result.subscribe((res: Medication) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Medication) {
        this.eventManager.broadcast({ name: 'medicationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-medication-popup',
    template: ''
})
export class MedicationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicationPopupService: MedicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.medicationPopupService
                    .open(MedicationDialogComponent as Component, params['id']);
            } else {
                this.medicationPopupService
                    .open(MedicationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
