import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Visit } from './visit.model';
import { VisitService } from './visit.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-visit',
    templateUrl: './visit.component.html'
})
export class VisitComponent implements OnInit, OnDestroy {
visits: Visit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private visitService: VisitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.visitService.query().subscribe(
            (res: ResponseWrapper) => {
                this.visits = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVisits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Visit) {
        return item.id;
    }
    registerChangeInVisits() {
        this.eventSubscriber = this.eventManager.subscribe('visitListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
