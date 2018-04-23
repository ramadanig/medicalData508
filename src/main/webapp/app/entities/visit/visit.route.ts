import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VisitComponent } from './visit.component';
import { VisitDetailComponent } from './visit-detail.component';
import { VisitPopupComponent } from './visit-dialog.component';
import { VisitDeletePopupComponent } from './visit-delete-dialog.component';

export const visitRoute: Routes = [
    {
        path: 'visit',
        component: VisitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visits'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'visit/:id',
        component: VisitDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const visitPopupRoute: Routes = [
    {
        path: 'visit-new',
        component: VisitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visit/:id/edit',
        component: VisitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visit/:id/delete',
        component: VisitDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
