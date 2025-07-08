import { Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AuthService } from './auth.service';
import { RegistFormComponent } from './regist-form/regist-form.component';
import { guardLGGuard } from './guard-lg.guard';
import { noAuthGuardGuar } from './no-auth-guard.guard';
import { RecoverComponent } from './recover/recover.component';

export const routes: Routes = [
    { path: 'login', component: LoginUserComponent, canActivate: [noAuthGuardGuar] },
    
    { path: 'recover', component: RecoverComponent, canActivate: [noAuthGuardGuar] },
    
    { path: 'task', component: AddTaskComponent, canActivate: [guardLGGuard]},

    { path: 'regist', component: RegistFormComponent, canActivate: [noAuthGuardGuar] },

    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];
