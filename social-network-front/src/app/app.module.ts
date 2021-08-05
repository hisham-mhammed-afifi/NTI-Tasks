import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgSelect2Module } from 'ng-select2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PostsComponent } from './components/posts/posts.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UserInterceptor } from './interceptor/user.interceptor';
import { ChatComponent } from './components/chat/chat.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    PostsComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    ChatComponent,
    NotfoundComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelect2Module,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
