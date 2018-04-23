import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Medication } from './medication.model';
import { MedicationService } from './medication.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-medication',
    templateUrl: './medication.component.html'
})
export class MedicationComponent implements OnInit, OnDestroy {
medications: Medication[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private medicationService: MedicationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.medicationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.medications = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMedications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Medication) {
        return item.id;
    }
    registerChangeInMedications() {
        this.eventSubscriber = this.eventManager.subscribe('medicationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
