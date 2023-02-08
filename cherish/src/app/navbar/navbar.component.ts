import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public dialog: MatDialog
  ) {

  }

  openAboutDialog(event: MouseEvent) {
    event.preventDefault();
    
    const dialogRef = this.dialog.open(AboutComponent);

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
  }
}
