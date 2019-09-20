import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-framework-poll',
  templateUrl: './framework-poll.component.html',
  styleUrls: ['./framework-poll.component.css'],
  encapsulation:ViewEncapsulation.Native
})
export class FrameworkPollComponent implements OnInit {

  angularVoteCount :number;
  reactVoteCount :number;
  vueVoteCount:number;
  hasVoted = false;
  updating = false;
  fsRef: AngularFirestoreDocument<any>;
  userscollection: AngularFirestoreCollection<any>;
  users: Observable<any[]>;
  constructor( private afs : AngularFirestore) { }

  ngOnInit() {
    this.fsRef = this.afs.doc('framework-poll/lUj7ipETr6hftwXgwHRK');
    this.fsRef.valueChanges().subscribe(doc =>{
      this.angularVoteCount = doc.angularVoteCount;
      this.reactVoteCount = doc.reactVoteCount;
      this.vueVoteCount = doc.vueVoteCount;
    })
    
  }

  vote(framework :string){
    this.updating = true;
    this.afs.firestore.runTransaction(t => {
      return t.get(this.fsRef.ref).then(doc =>{
        const newVoteCount = doc.data()[framework] + 1;
        t.update(this.fsRef.ref , { [framework] : newVoteCount})
      })
    })

    .then(()=>{
      this.hasVoted = true;
      this.updating = false;
      console.log("Transaction Successfully Commited !");
    })

    .catch(error => console.log("Transaction Failed :" + error));
  }
 

  get angularVoteCountPercent(){
    return ((this.angularVoteCount /(this.angularVoteCount + this.reactVoteCount + this.vueVoteCount))*100);
  }

  
  get reactVoteCountPercent(){
    return ((this.reactVoteCount /(this.angularVoteCount + this.reactVoteCount + this.vueVoteCount))*100);
  }

  
  get vueVoteCountPercent(){
    return ((this.vueVoteCount /(this.angularVoteCount + this.reactVoteCount + this.vueVoteCount))*100);
  }
}
