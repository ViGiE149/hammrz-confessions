import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, map, Observable } from 'rxjs';
import { EmojiPopUPPage } from '../emoji-pop-up/emoji-pop-up.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  time=new Date();
  confessions:any;
  reactionsNum=0;


    emotions = [
    { label: 'Love', emoji: '❤️' },
    { label: 'Care', emoji: '🥰' },
    { label: 'Haha', emoji: '😂' },
    { label: 'Wow', emoji: '😲' },
    { label: 'Sad', emoji: '😢' },
    { label: 'Angry', emoji: '😠' }
  ];
  
  constructor(private modalController: ModalController,private db: AngularFirestore,private router: Router,public navCtrl: NavController) {

    this.getConfessionsData();
  }

  ngOnInit() {
 
  }

// Home Page
async presentModal(id: any) {
  const modal = await this.modalController.create({
    component: EmojiPopUPPage,
    cssClass: 'my-modal',
    componentProps: {
      id: id
    }
  });
  return await modal.present();
}




 /* passCommentsData(ii:any){}
 confessions=  [
    {
      "confessionId":"#1",
      "title": "Confession Title",
      "emotion": "Sad",
      "confessionBody": "This is the body of the confession.",
      "timestamp": "2022-03-23T10:00:00Z",
      "comments": [
        {
          "user": "User1",
          "comment": "This is the first comment.",
          "timestamp": "2022-03-23T11:00:00Z"
        },
        {
          "user": "User2",
          "comment": "This is the second comment.",
          "timestamp": "2022-03-23T12:00:00Z"
        },
        {
          "user": "User3",
          "comment": "This is the third comment.",
          "timestamp": "2022-03-23T13:00:00Z"
        }
      ]
    },
    {
      "confessionId":"#2",
      "title": "Another Confession",
      "emotion": "Angry",
      "confessionBody": "This is another confession.",
      "timestamp": "2022-03-24T08:00:00Z",
      "comments": [
        {
          "user": "User4",
          "comment": "This is the first comment for the second confession.",
          "timestamp": "2022-03-24T09:00:00Z"
        },
        {
          "user": "User5",
          "comment": "This is the second comment for the second confession.",
          "timestamp": "2022-03-24T10:00:00Z"
        }]
  }]


/////
  passCommentsData(data:string){
    this.navCtrl.navigateForward('/comments', { queryParams: { data: data } });

  }}}?*/






  getConfessionsData() {

    this.db.collection('ConfessionDatabase')
      .valueChanges()
      .subscribe(data =>{
        
      this.confessions=data;  
      console.log(data);

  }); 

}


passCommentsData(data:string){
  this.navCtrl.navigateForward('/comments', { queryParams: { data: data } });

}
   
reactToConfession(emotionLabel:any,confessionId: string,emotionLabelCount:any) {
  // Update the reactions in the database based on condition
  const query = this.db.collection('ConfessionDatabase', (ref) => ref.where("confessionId", '==', confessionId));

  const queryObservable = from(query.get());
console.log(emotionLabel);
//console.log(emotionLabelCount);
  queryObservable.subscribe(
    (querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        // Access the document ID
        const documentId = documentSnapshot.id;
  
        // Access the data of each document
        const data = documentSnapshot.data();
  
        // Do something with the document ID and data
        console.log("Document ID:", documentId);
        console.log("Document Data:", data);
        

       alert(documentId)
       this.db.collection("ConfessionDatabase").doc(documentId).update({
      
          [`reactions.${emotionLabel}`] :(emotionLabelCount+1)
          
       
      }).then(function() {
        console.log("Frank food updated");
      });



      });
    },
    (error) => {
      // Handle any errors that occur during the retrieval
      console.error("Error getting documents: ", error);
    }
  );


}



}