import { Component } from '@angular/core';
import { Camera, PictureSourceType, DestinationType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    selectedImage: string;
    imageText: string;

    constructor() {
    }

    getPicture() {
      Camera.getPicture( {
        quality: 100,
        destinationType: DestinationType.DATA_URL,
        sourceType: PictureSourceType.CAMERA,
        allowEdit: false,
        saveToPhotoAlbum: false,
        correctOrientation: true
      }).then(imageData => {
        this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      }).catch( err => { console.log('[ERRILLO]',err) })
    }
   
    recognizeImage() {
      Tesseract.recognize(this.selectedImage)
      .progress(message => {
        if (message.status === 'recognizing text')
        console.log('[==>]',message.progress);
      })
      .catch(err => console.error(err))
      .then(result => {
        this.imageText = result.text;
      })
      .finally(resultOrError => {
        console.log('Process Ended')
      });
    }

}
