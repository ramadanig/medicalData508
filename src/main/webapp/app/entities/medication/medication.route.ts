import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MedicationComponent } from './medication.component';
import { MedicationDetailComponent } from './medication-detail.component';
import { MedicationPopupComponent } from './medication-dialog.component';
import { MedicationDeletePopupComponent } from './medication-delete-dialog.component';

export const medicationRoute: Routes = [
    {
        path: 'medication',
        component: MedicationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medications'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'medication/:id',
        component: MedicationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medications'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medicationPopupRoute: Routes = [
    {
        path: 'medication-new',
        component: MedicationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medications'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medication/:id/edit',
        component: MedicationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medications'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medication/:id/delete',
        component: MedicationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medications'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
