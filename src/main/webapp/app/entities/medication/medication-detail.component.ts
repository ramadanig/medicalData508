import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Medication } from './medication.model';
import { MedicationService } from './medication.service';

@Component({
    selector: 'jhi-medication-detail',
    templateUrl: './medication-detail.component.html'
})
export class MedicationDetailComponent implements OnInit, OnDestroy {

    medication: Medication;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private medicationService: MedicationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMedications();
    }

    load(id) {
        this.medicationService.find(id).subscribe((medication) => {
            this.medication = medication;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMedications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'medicationListModification',
            (response) => this.load(this.medication.id)
        );
    }
}
