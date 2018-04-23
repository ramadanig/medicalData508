import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Insurance } from './insurance.model';
import { InsuranceService } from './insurance.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-insurance',
    templateUrl: './insurance.component.html'
})
export class InsuranceComponent implements OnInit, OnDestroy {
insurances: Insurance[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private insuranceService: InsuranceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.insuranceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.insurances = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInsurances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Insurance) {
        return item.id;
    }
    registerChangeInInsurances() {
        this.eventSubscriber = this.eventManager.subscribe('insuranceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
