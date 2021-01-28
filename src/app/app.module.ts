import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    CreatePostComponent,
    HeaderComponent,
    EditPostComponent,
    DeleteDialogComponent
  ],
  entryComponents:[DeleteDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    MatBadgeModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
