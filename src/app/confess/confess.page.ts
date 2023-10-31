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
 termAndConditionChecked: boolean = true;

  constructor(private toastController: ToastController,private db: AngularFirestore,private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async submitConfession() {
    try {
  if(!this.emotion){
    alert("confession emotion selection required!!!!")
    return
  }
  if(this.confessionBody){
    alert("confession body input] is requid!!!")
    return
  }



      // Generate a unique confession ID and timestamp
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.confessionId = "#" + result;
      this.timestamp = new Date();
  
  
      const loader = await this.loadingController.create({
        message: 'Submitting Confession',
        cssClass: 'custom-loader-class'
      });
      await loader.present();
  

      await this.db.collection('ConfessionDatabase').add({
        confessionId: this.confessionId,
        title: this.title,
        emotion: this.emotion,
        confessionBody: this.confessionBody,
        timestamp: this.timestamp,
        comments: [],
        reactions: {
          Love: 0,
          Care: 0,
          Haha: 0,
          Wow: 0,
          Sad: 0,
          Angry: 0
        }
      });
      this.title = '';
      this.emotion = '';
      this.confessionBody = '';

      loader.dismiss();
      alert('Successfully submitted confession: ' + this.confessionId + "\n" + "You can track your confession using your confession ID " + this.confessionId);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed: ' + error);
    }
  }
  






async presentToast() {
const toast = await this.toastController.create({
  message: 'SIGNED OUT!',
  duration: 1500,
  position: 'top',

});

await toast.present();
}


agreeToTerms(){
  if(this.termAndConditionChecked){
    this.termAndConditionChecked=false;
  }else{
    this.termAndConditionChecked=true;
  }
}










}
