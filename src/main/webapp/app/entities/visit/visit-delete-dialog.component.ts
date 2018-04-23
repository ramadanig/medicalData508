import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Visit } from './visit.model';
import { VisitPopupService } from './visit-popup.service';
import { VisitService } from './visit.service';

@Component({
    selector: 'jhi-visit-delete-dialog',
    templateUrl: './visit-delete-dialog.component.html'
})
export class VisitDeleteDialogComponent {

    visit: Visit;

    constructor(
        private visitService: VisitService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.visitService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'visitListModification',
                content: 'Deleted an visit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-visit-delete-popup',
    template: ''
})
export class VisitDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitPopupService: VisitPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.visitPopupService
                .open(VisitDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
