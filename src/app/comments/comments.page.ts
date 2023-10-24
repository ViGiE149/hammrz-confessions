import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, map, Observable } from 'rxjs';
import { ActivatedRoute , Params} from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'], 
})
export class CommentsPage implements OnInit {
  id: any;
  confessions: any;
  time=new Date();
  comments = [];
  newComment: string = '';
  randomColor: any;

  constructor( private modalController: ModalController,
    private route: ActivatedRoute,
    private db: AngularFirestore
   ) {

    this.getThePassedData();
    console.log(this.id);
  
      this.randomColor = this.getRandomColor();
   }

   ngOnInit() {}


   async addComment() {
    try {
      // Check if this.confessions[0] and this.confessions[0].comments exist
      if (this.confessions[0] && this.confessions[0].comments) {
        this.confessions[0].comments.push(this.newComment);
      } else {
        console.error('Comments array not found in this.confessions[0]');
        return;
      }
  
      const query = this.db.collection("ConfessionDatabase", (ref) =>
        ref.where("confessionId", "==", this.id)
      );
  
      const querySnapshot = await query.get().toPromise();
  
      querySnapshot?.forEach((documentSnapshot) => {
        const documentId = documentSnapshot.id;
  
        this.db.collection("ConfessionDatabase").doc(documentId).update({
          comments: this.confessions[0].comments // Update the comments in the Firestore document
        }).then(() => {
          this.getConfessionData();
          console.log("Comments updated successfully.");
        });
      });
    } catch (error) {
      console.error("Error updating comments: ", error);
    }
  }
  
 

getThePassedData() {
  this.route.queryParams.subscribe((params: Params)  => {
    if (params && params['data']) {
      this.id = params['data'];
      console.log(this.id);
      this.getConfessionData();
    }
  });
}

getConfessionData() {
  if (this.id) {
    this.db.collection('ConfessionDatabase', ref => ref
      .where('confessionId', '==', this.id))
      .valueChanges()
      .subscribe(data => {
        this.confessions = data;  
        console.log(data);
      });
  }
}

getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

}
