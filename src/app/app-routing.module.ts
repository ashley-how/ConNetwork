import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './identity/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule', canActivate: [AuthGuard] },
  { path: 'messaging', loadChildren: './pages/messaging/messaging.module#MessagingPageModule', canActivate: [AuthGuard] },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule', canActivate: [AuthGuard] },
  { path: 'event-info', loadChildren: './modal/event-info/event-info.module#EventInfoPageModule' },
  { path: 'edit-profile', loadChildren: './modal/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'edit-work', loadChildren: './modal/edit-work/edit-work.module#EditWorkPageModule' },
  { path: 'edit-school', loadChildren: './modal/edit-school/edit-school.module#EditSchoolPageModule' },
  { path: 'edit-interest', loadChildren: './modal/edit-interest/edit-interest.module#EditInterestPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}