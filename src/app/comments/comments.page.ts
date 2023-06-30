import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';
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

  constructor( private modalController: ModalController,
    private route: ActivatedRoute,
    private db: AngularFirestore
   ) {

    this.getThePassedData();
    console.log(this.id);
   // this.getComment(); 
   }

   ngOnInit() {}






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


}
