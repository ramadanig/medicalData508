import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Insurance } from './insurance.model';
import { InsurancePopupService } from './insurance-popup.service';
import { InsuranceService } from './insurance.service';

@Component({
    selector: 'jhi-insurance-delete-dialog',
    templateUrl: './insurance-delete-dialog.component.html'
})
export class InsuranceDeleteDialogComponent {

    insurance: Insurance;

    constructor(
        private insuranceService: InsuranceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.insuranceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'insuranceListModification',
                content: 'Deleted an insurance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-insurance-delete-popup',
    template: ''
})
export class InsuranceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private insurancePopupService: InsurancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.insurancePopupService
                .open(InsuranceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
