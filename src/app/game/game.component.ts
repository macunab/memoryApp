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

  selectCard(index: number, value: number) {
    let showCard = new Audio('./assets/sounds/show-card.mp3');
    if(!this.isPlaying){
      this.timeCounter();
      this.isPlaying = true;
    }
    let card = <HTMLInputElement>document.getElementById('tarjeta' + index);
    this.cardNumber++;
   
    if(this.cardNumber == 1) {
      showCard.play();
      this.firstCard = value;
      this.firsCardIndex = index;
      this.rotateCard(card);
    } else if( this.cardNumber == 2 ) {
      showCard.play();
      this.movements++;
      this.secondCard = value;
      this.secondCardIndex = index;
      this.rotateCard(card);
      if(this.firstCard == this.secondCard && this.firsCardIndex != this.secondCardIndex) {
        this.cardNumber = 0;
        this.hits++;
        if(this.hits == 8) {
          clearInterval(this.interval);
          this.isPlaying = false;
          this.result = 'Felicidades ha ganado el juego';
          this.display = true;
        }
      } else {
        setTimeout(() => {
          this.cardNumber = 0;
          this.hideCard(this.firsCardIndex);
          this.hideCard(this.secondCardIndex);
        }, 800);
      }
    }
  }

  rotateCard(card: HTMLInputElement) {
    if (card.style.transform != "rotateY(180deg)") {
      card.style.transform = "rotateY(180deg)";
      card.style.pointerEvents = "none";
    }
  }

  hideCard(cardIndex: number) {
    let card = <HTMLInputElement>document.getElementById('tarjeta' + cardIndex);
    card.style.transform = "rotateY(0deg)";
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
      this.hideCard(i);
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
