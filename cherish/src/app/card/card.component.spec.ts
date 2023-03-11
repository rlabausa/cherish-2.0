import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPost } from '../models/cherish-data.model';
import { CherishDataService } from '../services/cherish-data.service';

import { CardComponent } from './card.component';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let post: IPost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        { provide: CherishDataService, }
      ],
      imports: [
        HttpClientModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    post = {
      id: 1,
      author: 'Ruby',
      title: 'Test Post Title',
      locationName: 'Everywhere',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      photoId: 11
    } as IPost;

    component.post = post;

    fixture.detectChanges();
  });

  beforeEach(() => {
    const cherishDataSvc = jasmine.createSpyObj('CherishDataService', ['getAllPosts']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display post data', () => {
    const author = document.querySelector<HTMLElement>('[data-testid="author"]').innerText;
    const body = document.querySelector<HTMLElement>('[data-testid="body"]').innerText;
    const title = document.querySelector<HTMLElement>('[data-testid="title"]').innerText;
    const photo = document.querySelector<HTMLImageElement>('[data-testid="photo"]');


    expect(author).toEqual(post.author);
    expect(body).toEqual(post.body);
    expect(title).toEqual(post.title);
    expect(photo).toBeTruthy();
    expect(photo.src).toContain(post.photoId.toString());

  });

  it('should display profile avatar placeholder', () => {
    const avatar = document.querySelector<HTMLImageElement>('[data-testid="avatar"]');
    expect(avatar).toBeTruthy();
  });


});
