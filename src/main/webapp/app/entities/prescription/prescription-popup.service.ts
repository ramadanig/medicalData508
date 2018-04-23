import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Prescription } from './prescription.model';
import { PrescriptionService } from './prescription.service';

@Injectable()
export class PrescriptionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private prescriptionService: PrescriptionService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.prescriptionService.find(id).subscribe((prescription) => {
                    if (prescription.expiration) {
                        prescription.expiration = {
                            year: prescription.expiration.getFullYear(),
                            month: prescription.expiration.getMonth() + 1,
                            day: prescription.expiration.getDate()
                        };
                    }
                    this.ngbModalRef = this.prescriptionModalRef(component, prescription);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.prescriptionModalRef(component, new Prescription());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    prescriptionModalRef(component: Component, prescription: Prescription): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.prescription = prescription;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
