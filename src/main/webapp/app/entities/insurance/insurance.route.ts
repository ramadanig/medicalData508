import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { InsuranceComponent } from './insurance.component';
import { InsuranceDetailComponent } from './insurance-detail.component';
import { InsurancePopupComponent } from './insurance-dialog.component';
import { InsuranceDeletePopupComponent } from './insurance-delete-dialog.component';

export const insuranceRoute: Routes = [
    {
        path: 'insurance',
        component: InsuranceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insurances'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'insurance/:id',
        component: InsuranceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insurances'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const insurancePopupRoute: Routes = [
    {
        path: 'insurance-new',
        component: InsurancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insurances'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'insurance/:id/edit',
        component: InsurancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insurances'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'insurance/:id/delete',
        component: InsuranceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Insurances'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
