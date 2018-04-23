import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DbtheoryDoctorModule } from './doctor/doctor.module';
import { DbtheoryPatientModule } from './patient/patient.module';
import { DbtheoryPrescriptionModule } from './prescription/prescription.module';
import { DbtheoryMedicationModule } from './medication/medication.module';
import { DbtheoryVisitModule } from './visit/visit.module';
import { DbtheoryAilmentModule } from './ailment/ailment.module';
import { DbtheoryInsuranceModule } from './insurance/insurance.module';
import { DbtheoryTestsModule } from './tests/tests.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DbtheoryDoctorModule,
        DbtheoryPatientModule,
        DbtheoryPrescriptionModule,
        DbtheoryMedicationModule,
        DbtheoryVisitModule,
        DbtheoryAilmentModule,
        DbtheoryInsuranceModule,
        DbtheoryTestsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbtheoryEntityModule {}
