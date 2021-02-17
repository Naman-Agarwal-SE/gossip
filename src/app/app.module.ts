import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './materials/materials.module';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreatePostComponent } from './create-post/create-post.component';
import { HeaderComponent } from './header/header.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import {MatBadgeModule} from '@angular/material/badge';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http';
import {CreatepostServiceService} from './createpost-service.service';
import { LikedbyDialogComponent } from './likedby-dialog/likedby-dialog.component';
import { NewPostAvailableComponent } from './new-post-available/new-post-available.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    CreatePostComponent,
    HeaderComponent,
    EditPostComponent,
    DeleteDialogComponent,
    SignUpComponent,
    LikedbyDialogComponent,
    NewPostAvailableComponent,
  ],
  entryComponents:[DeleteDialogComponent,LikedbyDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    MatBadgeModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
      }
    ),
  ],
  providers: [CreatepostServiceService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
