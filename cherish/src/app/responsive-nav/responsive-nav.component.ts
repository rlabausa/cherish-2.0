import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-responsive-nav',
  templateUrl: './responsive-nav.component.html',
  styleUrls: ['./responsive-nav.component.scss']
})
export class ResponsiveNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  openAboutDialog(event: MouseEvent) {
    event.preventDefault();

    const dialogRef = this.dialog.open(AboutComponent);

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
  }

}
