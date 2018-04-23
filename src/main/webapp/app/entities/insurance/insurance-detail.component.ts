import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Insurance } from './insurance.model';
import { InsuranceService } from './insurance.service';

@Component({
    selector: 'jhi-insurance-detail',
    templateUrl: './insurance-detail.component.html'
})
export class InsuranceDetailComponent implements OnInit, OnDestroy {

    insurance: Insurance;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private insuranceService: InsuranceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInsurances();
    }

    load(id) {
        this.insuranceService.find(id).subscribe((insurance) => {
            this.insurance = insurance;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInsurances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'insuranceListModification',
            (response) => this.load(this.insurance.id)
        );
    }
}
