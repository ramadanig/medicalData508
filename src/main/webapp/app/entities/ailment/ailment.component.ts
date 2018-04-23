import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Ailment } from './ailment.model';
import { AilmentService } from './ailment.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ailment',
    templateUrl: './ailment.component.html'
})
export class AilmentComponent implements OnInit, OnDestroy {
ailments: Ailment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ailmentService: AilmentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ailmentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ailments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAilments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ailment) {
        return item.id;
    }
    registerChangeInAilments() {
        this.eventSubscriber = this.eventManager.subscribe('ailmentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
