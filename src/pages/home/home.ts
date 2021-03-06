import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, ToastController, LoadingController, AlertController, Slides } from 'ionic-angular';
import { AppProvider } from "../../providers/app";
import { AttetionPage } from "./attetion/attetion";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  playersPenguins: any;
  playersAvalanche: any;
  info: string = "lineup";
  supporter: string = "online";
  rankingSeats: any;
  questions: any;
  questionDescription: any;
  user: any = JSON.parse(window.localStorage.getItem('user'));
  notification: any = JSON.parse(window.localStorage.getItem('notification'));
  answers: any;
  extract:any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public appPrvdr: AppProvider,
    public modalCtrl: ModalController
  ) {
    this.playersPenguins =
    [
      {
        "number": 15,
        "name"  : "R. Sheahan"
      },
      {
        "number": 17,
        "name"  : "B. Rust"
      },
      {
        "number": 71,
        "name"  : "E. Malkin"
      },
      {
        "number": 33,
        "name"  : "Z. Shara"
      },
      {
        "number": 14,
        "name"  : "P. Postma"
      },
      {
        "number": 40,
        "name"  : "T. Rask"
      }
    ]

    this.playersAvalanche =
    [
      {
        "number": 91,
        "name"  : "V. Kamenev"
      },
      {
        "number": 17,
        "name"  : "B. Comeau"
      },
      {
        "number": 71,
        "name"  : "C. Soderberg"
      },
      {
        "number": 33,
        "name"  : "P. Nemeth"
      },
      {
        "number": 14,
        "name"  : "A. Lindholm"
      },
      {
        "number": 40,
        "name"  : "A. Hammond"
      }
    ]
  }

  ionViewWillEnter(){
    this.getSeatRanking();
    this.getQuestions();
    this.getExtract();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getSeatRanking();
      this.getQuestions();
      this.getExtract();
      refresher.complete();
    }, 3000);
  }

  // notify(){
  //   let confirm = this.alertCtrl.create({
  //     title: 'Quiz!',
  //     subTitle: 'You have a new question.',
  //     buttons: [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     },
  //     {
  //       text: 'Answer',
  //       handler: () => {
  //         this.slides.slideTo(3, 500);
  //       }
  //     }
  //   ]
  //   });
  //   confirm.present();
  // }

  getSeatRanking(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="cssload-loader">
      <div class="cssload-inner cssload-one"></div>
      <div class="cssload-inner cssload-two"></div>
      <div class="cssload-inner cssload-three"></div>
      </div>`
    });
    loading.present();

    let error = err => {
      console.log('err', err);
      loading.dismiss();
    }
    let success = res => {
      this.rankingSeats = res;
      loading.dismiss();
    }
    this.appPrvdr.getSeatRanking().subscribe(success, error)
  }

  getExtract(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="cssload-loader">
      <div class="cssload-inner cssload-one"></div>
      <div class="cssload-inner cssload-two"></div>
      <div class="cssload-inner cssload-three"></div>
      </div>`
    });
    loading.present();

    let error = err => {
      console.log('err', err);
      loading.dismiss();
    }
    let success = res => {
      this.extract = res;
      loading.dismiss();
    }
    this.appPrvdr.getExtract(this.user.username).subscribe(success, error)
  }

  getQuestions(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="cssload-loader">
      <div class="cssload-inner cssload-one"></div>
      <div class="cssload-inner cssload-two"></div>
      <div class="cssload-inner cssload-three"></div>
      </div>`
    });
    loading.present();

    let error = err => {
      console.log('err', err);
      loading.dismiss();
    }
    let success = res => {
      this.questionDescription = res.description;
      this.questions = res.listAnswer;
      loading.dismiss();
    }
    this.appPrvdr.getQuestions(this.user.username).subscribe(success, error)
  }

  openRequest() {
   let profileModal = this.modalCtrl.create(AttetionPage, { username: this.user });
   profileModal.present();
  }

  answer(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="cssload-loader">
      <div class="cssload-inner cssload-one"></div>
      <div class="cssload-inner cssload-two"></div>
      <div class="cssload-inner cssload-three"></div>
      </div>`
    });
    loading.present();

    let error = err => {
      console.log('err', err);
      loading.dismiss();
    }
    let success = res => {
      if(res){
        let confirm = this.alertCtrl.create({
          title: 'Correct!',
          subTitle: 'Congratulations.',
          buttons: ['Ok']
        });
        confirm.present();
      }else{
        let confirm = this.alertCtrl.create({
          title: 'Wrong!',
          subTitle: 'Try again.',
          buttons: ['Ok']
        });
        confirm.present();
      }
      loading.dismiss();
      this.getExtract();
      this.slides.slideTo(0, 500);

    }
    this.appPrvdr.answer(this.answers, this.user.username).subscribe(success, error)
  }

  toWave(){
    let confirm = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Your greeting was sent.',
      buttons: ['Ok']
    });
    confirm.present();
  }

  changeNotifications() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="cssload-loader">
      <div class="cssload-inner cssload-one"></div>
      <div class="cssload-inner cssload-two"></div>
      <div class="cssload-inner cssload-three"></div>
      </div>`
    });
    loading.present();

    let error = err => {
      console.log('err', err);
      loading.dismiss();
    }
    let success = res => {
      window.localStorage.setItem('notification', JSON.stringify(res.receiveNotification));

      if(res.receiveNotification){
        let toast = this.toastCtrl.create({
          message: 'Notifications enabled',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.notification = res.receiveNotification;
      }else{
        let toast = this.toastCtrl.create({
          message: 'Notifications disabled',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.notification = res.receiveNotification;
      }
      loading.dismiss();
    }
    this.appPrvdr.changeNotifications(this.user.username).subscribe(success, error)

  }

}
