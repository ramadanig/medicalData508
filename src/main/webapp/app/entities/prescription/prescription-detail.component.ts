import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Prescription } from './prescription.model';
import { PrescriptionService } from './prescription.service';

@Component({
    selector: 'jhi-prescription-detail',
    templateUrl: './prescription-detail.component.html'
})
export class PrescriptionDetailComponent implements OnInit, OnDestroy {

    prescription: Prescription;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private prescriptionService: PrescriptionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrescriptions();
    }

    load(id) {
        this.prescriptionService.find(id).subscribe((prescription) => {
            this.prescription = prescription;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrescriptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'prescriptionListModification',
            (response) => this.load(this.prescription.id)
        );
    }
}
