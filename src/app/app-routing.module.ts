import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationDetailsComponent, LocationListComponent } from './components';

@Component({
  selector: 'not-found',
  template: `
    <neutron-card>
      <h2>Page Not Found</h2>
      <neutron-divider></neutron-divider>
      <div>
        <neutron-button routerLink=''>Back to main page</neutron-button>
      </div>
    </neutron-card>
    `,
  styles: [` 
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;

      neutron-card {
        width: calc(var(--card-max-width) * 3);
        padding: 1.5rem;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;

        neutron-divider {
          width: 100%;
          margin: 0.5rem 0 1rem 0;
        }
      }
    }
  `]
})
export class NotFoundComponent { }

const routes: Routes = [
  { path: '', component: LocationListComponent },
  { path: 'details', component: LocationDetailsComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
