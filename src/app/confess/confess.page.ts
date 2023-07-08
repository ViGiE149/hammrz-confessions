import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-confess',
  templateUrl: './confess.page.html',
  styleUrls: ['./confess.page.scss'],
})
export class ConfessPage implements OnInit {
 confessionId="";
 title="";
 emotion="";
 confessionBody="";
 timestamp:any;
 

  constructor(private toastController: ToastController,private db: AngularFirestore,private loadingController: LoadingController) { }

  ngOnInit() {
  }

async submitConfession(){



  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  this.confessionId ="#"+result;
  this.timestamp=new Date();


  const loader = await this.loadingController.create({
    message:  'Submitting Confession',
    cssClass: 'custom-loader-class'
  });
  await loader.present();

  this.db
    .collection('ConfessionDatabase')
    .add({
      confessionId: this.confessionId,
      title: this.title,
      emotion: this.emotion,
      confessionBody: this.confessionBody,
      timestamp: this.timestamp,
      comments:[],
      reactions:{ 
         Love:0,
         Care:0,
         Haha:0,
         Wow:0,
         Sad:0,
         Angry:0
      }
    })
    .then((docRef) => {
      loader.dismiss();
      console.log('Document written with ID: ', docRef.id);
      alert('Successfuly submitted confesstion : ' + this.confessionId+"\n"+"you can track your confession using your confession ID "+this.confessionId);
   
    })
    .catch((error) => {
      loader.dismiss();
      console.error('Error adding document: ', error);
      alert('faild : ' + error);
    });


}







async presentToast() {
const toast = await this.toastController.create({
  message: 'SIGNED OUT!',
  duration: 1500,
  position: 'top',

});

await toast.present();
}













}
