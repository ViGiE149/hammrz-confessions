import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-emoji-pop-up',
  templateUrl: './emoji-pop-up.page.html',
  styleUrls: ['./emoji-pop-up.page.scss'],
})
export class EmojiPopUPPage implements OnInit {


  @Input() id:any;

  emotions = [
    { label: 'Love', emoji: '❤️' },
    { label: 'Care', emoji: '🥰' },
    { label: 'Haha', emoji: '😂' },
    { label: 'Wow', emoji: '😲' },
    { label: 'Sad', emoji: '😢' },
    { label: 'Angry', emoji: '😠' }
  ];

  array={ emoji:"",
           id:""};
  constructor(private modalController: ModalController,private toastController: ToastController,
              private db: AngularFirestore,private loadingController: LoadingController) { }

  ngOnInit() {}


  async close(id: any) {
    try {
     const querySnapshot = await this.db
        .collection('yourCollectionName', (ref) => ref.where('id', '==', 'mike'))
        .get()
        .toPromise();
  
 querySnapshot?.forEach(async (doc: any) => {
        const currentReactions =await doc.data().reactions || [];
      await  currentReactions.push(id);
     await   doc.ref.update({ reactions: currentReactions });
      });
  
      alert('Document successfully updated');
      this.modalController.dismiss();
    } catch (error) {
      console.error('Error pushing reaction:', error);
    }
  }
  

/*
   async close(id:any) {
    

    this.db.collection('ConfessionDatabase').ref
    .where('confessionId', '==', this.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref
          .addValue({
           
             reactions:this.array, 

           
          })
          .then(() => {
            console.log('Document successfully updated');
            alert('Document successfully updated');
            this.modalController.dismiss();
            
            // Alert or perform any other action here
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
            alert(error.message);
            // Alert or perform any other action here
          });
      });
    })
    .catch((error) => {
      console.error('Error fetching documents: ', error);
      alert(error.message);
      // Alert or perform any other action here
    });
  
  



  }

*/

  async closez(){
    const modal = await this.modalController.dismiss(
    {
      'prodArray':"",
    }
    );
  }

  

}
