import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Prescription } from './prescription.model';
import { PrescriptionService } from './prescription.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-prescription',
    templateUrl: './prescription.component.html'
})
export class PrescriptionComponent implements OnInit, OnDestroy {
prescriptions: Prescription[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prescriptionService: PrescriptionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.prescriptionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.prescriptions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPrescriptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Prescription) {
        return item.id;
    }
    registerChangeInPrescriptions() {
        this.eventSubscriber = this.eventManager.subscribe('prescriptionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
