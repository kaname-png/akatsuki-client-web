import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { CustomPreloadingStrategy } from '../utils/strategys/CustomPreloadingStrategy/custom-preloading-strategy';
import { AuthGuard } from '../utils/guards/Auth/auth.guard';
import { NotFoundComponent } from '../pages/NotFound/not-found/not-found.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../pages/dashboard/dashboard.module').then(
        m => m.DashboardModule,
      ),
    data: {
      preload: false,
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      preload: true,
    },
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
