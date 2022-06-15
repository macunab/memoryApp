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

  constructor() { }

  ngOnInit(): void {
    this.cardItems = this.cardItems.sort(() => { return Math.random() - 0.5});
  }

  clickDiv(index: number, value: number) {
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
        this.cardNumber = 0;
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
      (<HTMLInputElement>document.getElementById('' + index)).innerHTML = `<img class="align-items-center" src="./assets/images/${value}.png" alt="">`;
      (<HTMLInputElement>document.getElementById('' + index)).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById('' + index)).innerHTML = `<img class="align-items-center" src="./assets/images/default.png" alt="">`;
      (<HTMLInputElement>document.getElementById('' + index)).disabled = false;
    } 
  }

  reloadCards() {
    for(let i = 0; i < 15; i++) {
      this.showHiddeCards(i, 0, false);
    }
    this.cardItems = this.cardItems.sort(() => { return Math.random() - 0.5});
  }

}
