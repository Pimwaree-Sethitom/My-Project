import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // ใช้ provideHttpClient แทน HttpClientModule
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()  // เพิ่ม provideHttpClient แทน HttpClientModule
  ]
}).catch(err => console.error(err));
