import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // ใช้ provideHttpClient แทน HttpClientModule
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // เพิ่ม provideHttpClient แทน HttpClientModule
    ReactiveFormsModule
  ]
}).catch(err => console.error(err));
