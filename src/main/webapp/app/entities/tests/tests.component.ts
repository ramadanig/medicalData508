import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Tests } from './tests.model';
import { TestsService } from './tests.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tests',
    templateUrl: './tests.component.html'
})
export class TestsComponent implements OnInit, OnDestroy {
tests: Tests[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testsService: TestsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.testsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tests = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tests) {
        return item.id;
    }
    registerChangeInTests() {
        this.eventSubscriber = this.eventManager.subscribe('testsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
