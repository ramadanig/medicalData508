/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DbtheoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InsuranceDetailComponent } from '../../../../../../main/webapp/app/entities/insurance/insurance-detail.component';
import { InsuranceService } from '../../../../../../main/webapp/app/entities/insurance/insurance.service';
import { Insurance } from '../../../../../../main/webapp/app/entities/insurance/insurance.model';

describe('Component Tests', () => {

    describe('Insurance Management Detail Component', () => {
        let comp: InsuranceDetailComponent;
        let fixture: ComponentFixture<InsuranceDetailComponent>;
        let service: InsuranceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DbtheoryTestModule],
                declarations: [InsuranceDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InsuranceService,
                    JhiEventManager
                ]
            }).overrideTemplate(InsuranceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InsuranceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsuranceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Insurance(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.insurance).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
