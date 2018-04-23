/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DbtheoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { VisitDetailComponent } from '../../../../../../main/webapp/app/entities/visit/visit-detail.component';
import { VisitService } from '../../../../../../main/webapp/app/entities/visit/visit.service';
import { Visit } from '../../../../../../main/webapp/app/entities/visit/visit.model';

describe('Component Tests', () => {

    describe('Visit Management Detail Component', () => {
        let comp: VisitDetailComponent;
        let fixture: ComponentFixture<VisitDetailComponent>;
        let service: VisitService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DbtheoryTestModule],
                declarations: [VisitDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    VisitService,
                    JhiEventManager
                ]
            }).overrideTemplate(VisitDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VisitDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisitService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Visit(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.visit).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
