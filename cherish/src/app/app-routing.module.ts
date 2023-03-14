import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoriesComponent } from './stories/stories.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  // "first-match wins" strategy
  // more specific routes should be placed above less specific routes
  { path: 'map', component: MapComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'stories', component: StoriesComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } // Wildcard route (i.e., matches every URL) for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
