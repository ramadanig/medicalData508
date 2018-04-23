import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbtheorySharedModule } from '../../shared';
import {
    MedicationService,
    MedicationPopupService,
    MedicationComponent,
    MedicationDetailComponent,
    MedicationDialogComponent,
    MedicationPopupComponent,
    MedicationDeletePopupComponent,
    MedicationDeleteDialogComponent,
    medicationRoute,
    medicationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...medicationRoute,
    ...medicationPopupRoute,
];

@NgModule({
    imports: [
        DbtheorySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MedicationComponent,
        MedicationDetailComponent,
        MedicationDialogComponent,
        MedicationDeleteDialogComponent,
        MedicationPopupComponent,
        MedicationDeletePopupComponent,
    ],
    entryComponents: [
        MedicationComponent,
        MedicationDialogComponent,
        MedicationPopupComponent,
        MedicationDeleteDialogComponent,
        MedicationDeletePopupComponent,
    ],
    providers: [
        MedicationService,
        MedicationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbtheoryMedicationModule {}
