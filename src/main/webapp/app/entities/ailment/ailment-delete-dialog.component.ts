import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ailment } from './ailment.model';
import { AilmentPopupService } from './ailment-popup.service';
import { AilmentService } from './ailment.service';

@Component({
    selector: 'jhi-ailment-delete-dialog',
    templateUrl: './ailment-delete-dialog.component.html'
})
export class AilmentDeleteDialogComponent {

    ailment: Ailment;

    constructor(
        private ailmentService: AilmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ailmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ailmentListModification',
                content: 'Deleted an ailment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ailment-delete-popup',
    template: ''
})
export class AilmentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ailmentPopupService: AilmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ailmentPopupService
                .open(AilmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
