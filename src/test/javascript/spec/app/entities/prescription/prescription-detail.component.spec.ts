/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DbtheoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PrescriptionDetailComponent } from '../../../../../../main/webapp/app/entities/prescription/prescription-detail.component';
import { PrescriptionService } from '../../../../../../main/webapp/app/entities/prescription/prescription.service';
import { Prescription } from '../../../../../../main/webapp/app/entities/prescription/prescription.model';

describe('Component Tests', () => {

    describe('Prescription Management Detail Component', () => {
        let comp: PrescriptionDetailComponent;
        let fixture: ComponentFixture<PrescriptionDetailComponent>;
        let service: PrescriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DbtheoryTestModule],
                declarations: [PrescriptionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PrescriptionService,
                    JhiEventManager
                ]
            }).overrideTemplate(PrescriptionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrescriptionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrescriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Prescription(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.prescription).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
