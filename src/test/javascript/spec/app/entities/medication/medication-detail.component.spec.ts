/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DbtheoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MedicationDetailComponent } from '../../../../../../main/webapp/app/entities/medication/medication-detail.component';
import { MedicationService } from '../../../../../../main/webapp/app/entities/medication/medication.service';
import { Medication } from '../../../../../../main/webapp/app/entities/medication/medication.model';

describe('Component Tests', () => {

    describe('Medication Management Detail Component', () => {
        let comp: MedicationDetailComponent;
        let fixture: ComponentFixture<MedicationDetailComponent>;
        let service: MedicationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DbtheoryTestModule],
                declarations: [MedicationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MedicationService,
                    JhiEventManager
                ]
            }).overrideTemplate(MedicationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedicationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Medication(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.medication).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
