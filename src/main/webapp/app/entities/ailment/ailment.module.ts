import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbtheorySharedModule } from '../../shared';
import {
    AilmentService,
    AilmentPopupService,
    AilmentComponent,
    AilmentDetailComponent,
    AilmentDialogComponent,
    AilmentPopupComponent,
    AilmentDeletePopupComponent,
    AilmentDeleteDialogComponent,
    ailmentRoute,
    ailmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ailmentRoute,
    ...ailmentPopupRoute,
];

@NgModule({
    imports: [
        DbtheorySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AilmentComponent,
        AilmentDetailComponent,
        AilmentDialogComponent,
        AilmentDeleteDialogComponent,
        AilmentPopupComponent,
        AilmentDeletePopupComponent,
    ],
    entryComponents: [
        AilmentComponent,
        AilmentDialogComponent,
        AilmentPopupComponent,
        AilmentDeleteDialogComponent,
        AilmentDeletePopupComponent,
    ],
    providers: [
        AilmentService,
        AilmentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbtheoryAilmentModule {}
