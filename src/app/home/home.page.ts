import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { from, map, Observable } from "rxjs";
import { EmojiPopUPPage } from "../emoji-pop-up/emoji-pop-up.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  time = new Date();
  confessions: any[]=[];
  reactionsNum = 0;
  searchText='';

  emotions = [
    { label: "Love", emoji: "❤️" },
    { label: "Care", emoji: "🥰" },
    { label: "Haha", emoji: "😂" },
    { label: "Wow", emoji: "😲" },
    { label: "Sad", emoji: "😢" },
    { label: "Angry", emoji: "😠" },
  ];
  originalConfessions: any[]=[];

  constructor(
    private modalController: ModalController,
    private db: AngularFirestore,
    private router: Router,
    public navCtrl: NavController
  ) {
    this.getConfessionsData();
    this.getConfessionsListener();
  }

  ngOnInit() { }


  async presentModal(id: any) {
    const modal = await this.modalController.create({
      component: EmojiPopUPPage,
      cssClass: "my-modal",
      componentProps: {
        id: id,
      },
    });
    return await modal.present();
  }

  getConfessionsData() {
    this.db
      .collection("ConfessionDatabase")
      .get()
      .subscribe((querySnapshot) => {
        this.originalConfessions = querySnapshot.docs.map((doc) => doc.data());
        this.confessions = [...this.originalConfessions]; // Create a copy
        console.log(this.confessions);
      });
  }
  

  getConfessionsListener() {
    this.db
      .collection("ConfessionDatabase")
      .snapshotChanges() // Use snapshotChanges() instead of valueChanges()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((change) => {
          if (change.type === "added") {
            // This code will run only when a new document is added
            this.confessions.push(change.payload.doc.data());
            const data = change.payload.doc.data();
            const id = change.payload.doc.id;
            console.log("New document added with ID: ", id);
            console.log(data);
            // Do something with the new document here
          }
        });
      });
  }
  

  passCommentsData(data: string) {
    this.navCtrl.navigateForward("/comments", { queryParams: { data: data } });
  }

  reactToConfession(
    emotionLabel: any,
    confessionId: string,
    emotionLabelCount: any,
    i: any
  ) {
 
    const updatedEmotionLabelCount = emotionLabelCount + 1;
    this.confessions[i].reactions[emotionLabel] = updatedEmotionLabelCount;


    const query = this.db.collection("ConfessionDatabase", (ref) =>
      ref.where("confessionId", "==", confessionId)
    );

    const queryObservable = from(query.get());
    console.log(emotionLabel);

    queryObservable.subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
    
          const documentId = documentSnapshot.id;


          const data = documentSnapshot.data();

      
          console.log("Document ID:", documentId);
          console.log("Document Data:", data);

 
          this.db
            .collection("ConfessionDatabase")
            .doc(documentId)
            .update({
              [`reactions.${emotionLabel}`]: emotionLabelCount + 1,
            })
            .then(function () {
              console.log("Frank food updated");
            });
        });
      },
      (error) => {
        
        console.error("Error getting documents: ", error);
      }
    );
  }


  filterConfessions() {
    if (this.searchText) {
      this.confessions = this.originalConfessions.filter(confession => {
        return confession.confessionId.includes(this.searchText);
      });
    } else {
      // Reset to the original data when the search text is empty
      this.confessions = [...this.originalConfessions];
    }
  }
  
}
