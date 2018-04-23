import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AilmentComponent } from './ailment.component';
import { AilmentDetailComponent } from './ailment-detail.component';
import { AilmentPopupComponent } from './ailment-dialog.component';
import { AilmentDeletePopupComponent } from './ailment-delete-dialog.component';

export const ailmentRoute: Routes = [
    {
        path: 'ailment',
        component: AilmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ailments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ailment/:id',
        component: AilmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ailments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ailmentPopupRoute: Routes = [
    {
        path: 'ailment-new',
        component: AilmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ailments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ailment/:id/edit',
        component: AilmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ailments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ailment/:id/delete',
        component: AilmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ailments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
