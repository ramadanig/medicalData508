import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Ailment } from './ailment.model';
import { AilmentService } from './ailment.service';

@Component({
    selector: 'jhi-ailment-detail',
    templateUrl: './ailment-detail.component.html'
})
export class AilmentDetailComponent implements OnInit, OnDestroy {

    ailment: Ailment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ailmentService: AilmentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAilments();
    }

    load(id) {
        this.ailmentService.find(id).subscribe((ailment) => {
            this.ailment = ailment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAilments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ailmentListModification',
            (response) => this.load(this.ailment.id)
        );
    }
}
