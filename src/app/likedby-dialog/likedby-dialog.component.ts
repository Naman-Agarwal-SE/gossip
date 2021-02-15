import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CreatepostServiceService} from '../createpost-service.service';


@Component({
  selector: 'app-likedby-dialog',
  templateUrl: './likedby-dialog.component.html',
  styleUrls: ['./likedby-dialog.component.css']
})
export class LikedbyDialogComponent implements OnInit {
  likedData:object;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private postService : CreatepostServiceService) { }

  ngOnInit(): void {
    this.postService.likedBy(this.data).subscribe((data) =>{
      this.likedData=data;
      // console.log(this.likedData);
    });
  }


}
