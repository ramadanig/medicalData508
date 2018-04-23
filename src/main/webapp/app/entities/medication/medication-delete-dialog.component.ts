import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Medication } from './medication.model';
import { MedicationPopupService } from './medication-popup.service';
import { MedicationService } from './medication.service';

@Component({
    selector: 'jhi-medication-delete-dialog',
    templateUrl: './medication-delete-dialog.component.html'
})
export class MedicationDeleteDialogComponent {

    medication: Medication;

    constructor(
        private medicationService: MedicationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medicationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'medicationListModification',
                content: 'Deleted an medication'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medication-delete-popup',
    template: ''
})
export class MedicationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicationPopupService: MedicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.medicationPopupService
                .open(MedicationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
