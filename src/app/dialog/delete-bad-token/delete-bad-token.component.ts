import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBarRef, MatSnackBar } from '@angular/material';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-delete-bad-token',
  templateUrl: './delete-bad-token.component.html',
  styleUrls: ['./delete-bad-token.component.css']
})
export class DeleteBadTokenComponent implements OnInit {

  constructor(
    private homeS: HomeService,
    private snackbar: MatSnackBar,
    private snackbarRef: MatSnackBarRef<DeleteBadTokenComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deletetoken($event: MouseEvent){
    $event.preventDefault();
    this.homeS.remove();
    this.snackbarRef.dismiss();
    this.snackbar.open("Problem Resolved!", "Close", {
      duration: 4000
    });
    this.router.navigateByUrl('/');
  }

}
