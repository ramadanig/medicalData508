import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbtheorySharedModule } from '../../shared';
import {
    InsuranceService,
    InsurancePopupService,
    InsuranceComponent,
    InsuranceDetailComponent,
    InsuranceDialogComponent,
    InsurancePopupComponent,
    InsuranceDeletePopupComponent,
    InsuranceDeleteDialogComponent,
    insuranceRoute,
    insurancePopupRoute,
} from './';

const ENTITY_STATES = [
    ...insuranceRoute,
    ...insurancePopupRoute,
];

@NgModule({
    imports: [
        DbtheorySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InsuranceComponent,
        InsuranceDetailComponent,
        InsuranceDialogComponent,
        InsuranceDeleteDialogComponent,
        InsurancePopupComponent,
        InsuranceDeletePopupComponent,
    ],
    entryComponents: [
        InsuranceComponent,
        InsuranceDialogComponent,
        InsurancePopupComponent,
        InsuranceDeleteDialogComponent,
        InsuranceDeletePopupComponent,
    ],
    providers: [
        InsuranceService,
        InsurancePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbtheoryInsuranceModule {}
