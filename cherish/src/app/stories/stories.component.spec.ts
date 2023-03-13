import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IGetPostsResponse } from '../models/cherish-data.model';
import { CherishDataService } from '../services/cherish-data.service';

import { StoriesComponent } from './stories.component';

fdescribe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let cherishDataSvc: jasmine.SpyObj<CherishDataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoriesComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    cherishDataSvc = jasmine.createSpyObj(['getAllPosts']);
    cherishDataSvc.getAllPosts.and.returnValue(
      of(
        {
          _embedded: {
            postList: [
              {
                id: 1,
                author: 'R2-D2',
                title: '01000100 01100101 01110011 01100101 01110010 01110100',
                body: '01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001',
                locationName: 'Tatooine',
                photoId: 11
              },
              {
                id: 2,
                author: 'Anakin Skywalker',
                title: 'Sand',
                body: `I don't like sand, it's coarse, rough, irritating, and gets everywhere.`,
                locationName: 'Naboo',
                photoId: 22
              }
            ]
          }
        } as IGetPostsResponse
      )
    );

    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 cards', () => {
    const cards = document.querySelectorAll<HTMLElement>('app-card');
    

    expect(cards.length).toEqual(2);
  });


});
