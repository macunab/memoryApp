import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {

  cardItems: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  cardNumber: number = 0;
  movements: number = 0;
  firstCard: number = 0;
  secondCard: number = 0;
  firsCardIndex: number = 0;
  secondCardIndex: number = 0;
  timer: number = 30;
  hits: number = 0;
  isPlaying: boolean = false;
  interval: any;
  display: boolean = false;
  result: string = '';

  constructor() { }

  ngOnInit(): void {
    this.cardItems = this.cardItems.sort(() => { return Math.random() - 0.5});
  }

  clickDiv(index: number, value: number) {
    if(!this.isPlaying){
      this.timeCounter();
      this.isPlaying = true;
    }
    this.cardNumber++;
    if (this.cardNumber == 1) {
      this.firstCard = value;
      this.firsCardIndex = index;
      this.showHiddeCards(index, value, true);

    } else if(this.cardNumber == 2){
      this.showHiddeCards(index, value, true);
      this.movements++;
      this.secondCard = value;
      this.secondCardIndex = index;

      if(this.firstCard == this.secondCard) {
        console.log('LAS CARTAS COINCIDEN');
        this.hits++;
        this.cardNumber = 0;
        if(this.hits == 8) {
          clearInterval(this.interval);
          this.isPlaying = false;
          this.result = 'Felicidades ha ganado el juego';
          this.display = true;
        }
      } else {
        setTimeout (() => {
          this.cardNumber = 0;
          this.showHiddeCards(this.firsCardIndex, this.firstCard, false);
          this.showHiddeCards(this.secondCardIndex, this.secondCard, false);
        }, 800);
      }
    }
  }

  showHiddeCards(index: number, value: number, show: boolean){
    if(show){
      (<HTMLInputElement>document.getElementById('' + index)).innerHTML = `<img class="align-items-center" src="./assets/images/${value}.webp" alt="">`;
      (<HTMLInputElement>document.getElementById('' + index)).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById('' + index)).innerHTML = `<img class="align-items-center" src="./assets/images/default.webp" alt="">`;
      (<HTMLInputElement>document.getElementById('' + index)).disabled = false;
    } 
  }

  reloadCards() {
    clearInterval(this.interval);
    this.cardNumber = 0;
    this.isPlaying = false;
    this.display = false;
    this.hits = 0;
    this.movements = 0;
    this.timer = 30;
    for(let i = 0; i <= 15; i++) {
      this.showHiddeCards(i, 0, false);
    }
    this.cardItems = this.cardItems.sort(() => { return Math.random() - 0.5});
  }

  timeCounter() {
    this.interval = setInterval(() => {
      this.timer--;
      if(this.timer == 0) {
        clearInterval(this.interval);
        this.isPlaying = false;
        this.result = 'Se ha acabado el tiempo! ha perdido... :(';
        this.display = true;
      }
    }, 1000); 
  }

}
