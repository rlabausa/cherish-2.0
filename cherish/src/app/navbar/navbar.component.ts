import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit{
  mobileQuery: MediaQueryList;
  sideNavMode: 'over' | 'side' = 'side';

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  constructor(
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private breakpointObserver: BreakpointObserver
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  openAboutDialog(event: MouseEvent) {
    event.preventDefault();

    const dialogRef = this.dialog.open(AboutComponent);

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
  }

  ngAfterViewInit() {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .subscribe((breakpoint) => {
        if (breakpoint.matches) {
          this.sideNavMode = 'side';
        } else {
          this.sideNavMode = 'over';
        }
      });
  }
}
