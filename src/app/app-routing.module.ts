import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SmartBoxComponent } from './components/smart-box/smart-box.component';

const routes: Routes = [
  // {path:'',redirectTo : '/home', pathMatch:'full'},
  {path:'',component: HomeComponent,
        children:[
          {path:'datascience',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"datascience"}},
          {path:'hadoop',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"hadoop"}},
          {path:'aws',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"aws"}},
          {path:'devops',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"devops"}},
          {path:'salesforce',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"salesforce"}},
          {path:'selenium',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"selenium"}},
          {path:'java',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"java"}},
          {path:'spring',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"spring"}},
          {path:'xml',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"xml"}},
          {path:'android',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"android"}},
          {path:'iphone',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"iphone"}},
          {path:'iot',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"iot"}},
          {path:'aot',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"aot"}},
          {path:'aot1',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"aot1"}},
          {path:'aot2',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"aot2"}},
          {path:'android1',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"android1"}},
          {path:'android2',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"android2"}},
          {path:'android3',component: SmartBoxComponent ,data:{src:"",appNavigationConfig:"android3"}}]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
