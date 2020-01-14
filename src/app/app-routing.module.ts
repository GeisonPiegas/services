import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'signin', 
    pathMatch: 'full' 
  },
  {
    path: 'signin', 
    loadChildren: './pages/signin/signin.module#SigninPageModule', 
    canActivate: [LoginGuard] 
  },
  { 
    path: 'resetpassword', 
    loadChildren: './pages/resetpassword/resetpassword.module#ResetpasswordPageModule' 
  },
  { 
    path: 'cadastro', 
    loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' 
  },
  { 
    path: 'tutorial', 
    loadChildren: './pages/tutorial/tutorial.module#TutorialPageModule' 
  },
  { 
    path: 'menu', 
    loadChildren: './pages/menu/menu.module#MenuPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
