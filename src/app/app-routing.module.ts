import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import {CreatePostComponent} from './create-post/create-post.component'
import { EditPostComponent } from './edit-post/edit-post.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path:'login', component: LoginComponent},
  { path:'signUp', component: SignUpComponent},
  { path:'create-post', component: CreatePostComponent},
  {path:'edit-post', component: EditPostComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path:'**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
