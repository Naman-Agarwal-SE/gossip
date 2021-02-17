import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-new-post-available',
  templateUrl: './new-post-available.component.html',
  styleUrls: ['./new-post-available.component.css']
})
export class NewPostAvailableComponent implements OnInit {

  constructor(private routed:Router) { }
  @Input() hint:boolean; 
  @Output() refresh =new EventEmitter;
  ngOnInit(): void {
  }
  newPostRender=()=>{
    // console.log("hello")
    this.refresh.emit();
    // console.log("hello");
  }

}
