import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbtheorySharedModule } from '../../shared';
import {
    TestsService,
    TestsPopupService,
    TestsComponent,
    TestsDetailComponent,
    TestsDialogComponent,
    TestsPopupComponent,
    TestsDeletePopupComponent,
    TestsDeleteDialogComponent,
    testsRoute,
    testsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...testsRoute,
    ...testsPopupRoute,
];

@NgModule({
    imports: [
        DbtheorySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TestsComponent,
        TestsDetailComponent,
        TestsDialogComponent,
        TestsDeleteDialogComponent,
        TestsPopupComponent,
        TestsDeletePopupComponent,
    ],
    entryComponents: [
        TestsComponent,
        TestsDialogComponent,
        TestsPopupComponent,
        TestsDeleteDialogComponent,
        TestsDeletePopupComponent,
    ],
    providers: [
        TestsService,
        TestsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbtheoryTestsModule {}
