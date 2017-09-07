import { RouterModule } from '@angular/router';
// 当然是选择异步路由啦。所以在这里不直接引入组件，而是子模块的路由配置。也不要在这里import模块或组件。

export const appRoutes = [
  {
    path: 'user',
    loadChildren: './user-login/user-login.module#UserLoginModule'
  },
  {
    path: '',   // 空路由指向内容页。这样url短，好看
    loadChildren: './content/content.module#ContentModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
