import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
   constructor(private alertController: AlertController,  private router:Router, private toastController: ToastController) {
    this.sideMenu();
  }

  
  navigate:any

sideMenu()
  {
    this.navigate =
    [
      {
        title : "home",
        url   : "/home",
        icon  : "home-outline"
      },
      {
        title : "submit confession",
        url   : "/confess",
        icon  : "newspaper-outline"
      },
      {
        title : "support",
        url   : "/email-support",
        icon  : "mail-outline"
      },
      {
        title : "about",
        url   : "/about",
        icon  : "help-circle-outline"
      },
      {
        title : "HELP LINE NUMBERS",
        url   : "/help-line",
        icon  : "help-buoy-outline",
        color:"danger",
        Click : this.logout.bind(this)
      },
    ]
  }

  logout() {
    // perform logout action, e.g. clear session, local storage, etc.
    this.presentConfirmationAlert()
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: "Confirmation",
      message: "Are you sure you want to SIGN OUT?",
   buttons: [
        {
          text: "Cancel",
          role: "cancel",
         cssClass: "my-custom-alert",
          handler: () => {
            console.log("Confirmation canceled");
          }
        }, {
          text: "Confirm",
          handler: () => {
            this.router.navigateByUrl("/login");
              this.presentToast();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "SIGNED OUT!",
      duration: 1500,
      position: "top",
    
    });

    await toast.present();
  }

}
