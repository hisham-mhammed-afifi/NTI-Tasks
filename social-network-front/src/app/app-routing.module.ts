import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'user',
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
    ],
    canActivate: [HomeGuard],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
