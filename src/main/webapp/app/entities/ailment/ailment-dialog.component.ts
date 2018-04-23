import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ailment } from './ailment.model';
import { AilmentPopupService } from './ailment-popup.service';
import { AilmentService } from './ailment.service';

@Component({
    selector: 'jhi-ailment-dialog',
    templateUrl: './ailment-dialog.component.html'
})
export class AilmentDialogComponent implements OnInit {

    ailment: Ailment;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ailmentService: AilmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ailment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ailmentService.update(this.ailment));
        } else {
            this.subscribeToSaveResponse(
                this.ailmentService.create(this.ailment));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ailment>) {
        result.subscribe((res: Ailment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ailment) {
        this.eventManager.broadcast({ name: 'ailmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-ailment-popup',
    template: ''
})
export class AilmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ailmentPopupService: AilmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ailmentPopupService
                    .open(AilmentDialogComponent as Component, params['id']);
            } else {
                this.ailmentPopupService
                    .open(AilmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
