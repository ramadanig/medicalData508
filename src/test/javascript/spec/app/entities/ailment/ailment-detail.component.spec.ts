/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DbtheoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AilmentDetailComponent } from '../../../../../../main/webapp/app/entities/ailment/ailment-detail.component';
import { AilmentService } from '../../../../../../main/webapp/app/entities/ailment/ailment.service';
import { Ailment } from '../../../../../../main/webapp/app/entities/ailment/ailment.model';

describe('Component Tests', () => {

    describe('Ailment Management Detail Component', () => {
        let comp: AilmentDetailComponent;
        let fixture: ComponentFixture<AilmentDetailComponent>;
        let service: AilmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DbtheoryTestModule],
                declarations: [AilmentDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AilmentService,
                    JhiEventManager
                ]
            }).overrideTemplate(AilmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AilmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AilmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Ailment(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ailment).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
