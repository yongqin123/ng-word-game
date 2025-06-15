import { Component , inject , OnInit} from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { WordService } from './wordlist.service';
import interact from 'interactjs';
import { Leaderboard } from '../leaderboard';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../leaderboard.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
  
})
export class GameComponent  {
  name = localStorage.getItem('name');
  scoree = localStorage.setItem('score', '0');
  score  = localStorage.getItem('score');
  wordService = inject(WordService);
  word1 = this.wordService.getRandomWord();
  word2 = this.wordService.getRandomWord();
  word3 = this.wordService.getRandomWord();
  leaderboards: Leaderboard = new Leaderboard(1,"test","0");



  constructor(private leaderboardService: LeaderboardService) {}
  
  words = this.wordService.getWordList();
  letters = this.wordService.getLetters();
  title = 'my-angular-app'; 
  correct_word_boolean = {wordone:false, wordtwo:false, wordthree:false};
  
  sendPostRequest() {
    const postData = { name : localStorage.getItem('name'), score : localStorage.getItem('score') }; // Replace with your data
    this.leaderboardService.addLeaderboard(postData).subscribe()
    window.location.href = "/";
  }
  
    
  
  
    ngOnInit(): void { 
      // target elements with the "draggable" class
      this.initializeInteract(this.word1, this.word2, this.word3, this.correct_word_boolean);
      //this.addToLeaderboard();
      
    }
    initializeInteract( word1: string,  word2: string,  word3: string, correct_word_boolean: {wordone:boolean, wordtwo:boolean, wordthree:boolean}): void {
      var namee = localStorage.getItem('name');
      var score = localStorage.getItem('score');
      

      window.onload = function() {
        var minute = 8;
        var sec = 30;
        setInterval(function() {
          (document.getElementById("time") as HTMLSpanElement).innerHTML = " " + minute + "min " + sec + "sec";
          sec--;
      
          if (sec == 0o0) {
            minute--;
            sec = 60;
      
            if (minute == 0) {
              minute = 0;
            }
          }
          if (sec == 1 && minute == 0) {
            var next = document.getElementById("next");
            (next as HTMLHeadElement).style.display = "block";
            namee = localStorage.getItem('name');
            score = localStorage.getItem('score');
          }
          if (minute < 0 || sec < 0) {
            minute = 0;
            sec = 0;
          }
          

      

        }, 1000);
      }

      interact('.draggable')
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        }
      });

    interact('.dropzone').dropzone({
      accept: '.draggable',
      overlap: 0.75,

      ondragenter(event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;
        dropzoneElement.textContent = draggableElement.innerHTML;
        const elements_word1 = document.getElementsByClassName("word1");
        const elements_word2 = document.getElementsByClassName("word2");
        const elements_word3 = document.getElementsByClassName("word3");
        
        var ans_word1 = "";
        var ans_word2 = "";
        var ans_word3 = "";

        for (let i=0; i < elements_word1.length; i++) {
          ans_word1 = ans_word1 + elements_word1[i].textContent;
        }
        for (let i=0; i < elements_word2.length; i++) {
          ans_word2 = ans_word2 + elements_word2[i].textContent;
        }for (let i=0; i < elements_word3.length; i++) {
          ans_word3 = ans_word3 + elements_word3[i].textContent;
        }
        ans_word1 = ans_word1.replace(/ /g,'');
        ans_word2 = ans_word2.replace(/ /g,'');
        ans_word3 = ans_word3.replace(/ /g,'');
        
        console.log("word1: " +  ans_word1);
        console.log("word2: " + ans_word2);
        console.log("word3: " + ans_word3);
        if (ans_word1 == word1) {
          for (let i=0; i < elements_word1.length; i++) {
            //(elements_word1[i] as HTMLInputElement).style.backgroundColor = "green";
          }
          correct_word_boolean["wordone"] = true;
        }
        if (ans_word2 == word2) {
          for (let i=0; i < elements_word2.length; i++) {
            //(elements_word2[i] as HTMLInputElement).style.backgroundColor = "green";
          }
          correct_word_boolean["wordtwo"] = true;
        }
        if (ans_word3 == word3) {
          for (let i=0; i < elements_word3.length; i++) {
            //(elements_word3[i] as HTMLInputElement).style.backgroundColor = "green";
          }
          correct_word_boolean["wordthree"] = true;
          
        }
        

        if (correct_word_boolean["wordone"] == true && correct_word_boolean["wordtwo"] == true && correct_word_boolean["wordthree"] == true) {
          console.log("You Win");
        }
        if (correct_word_boolean["wordone"] == true) {
          var multiplier = parseInt(((document.getElementById("time") as HTMLSpanElement).innerHTML).toString()[1]);
          if (multiplier == 0) {
            multiplier = 1;
          }
          (document.getElementById("score") as HTMLHeadElement).innerHTML = (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString();

          const elements = document.getElementsByClassName('word1');
          for (let i = 0; i < elements.length; i++) {
            const input = elements[i] as HTMLInputElement;
            input.remove();
          }
          const elements_img = document.getElementsByClassName('wordoneImg');
          for (let i = 0; i < elements_img .length; i++) {
            const input = elements_img[i] as HTMLImageElement;
            input.src = "../../assets/tileCorrect.png";
          }      
        
          localStorage.setItem('score', (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString());
          console.log(localStorage.getItem('score'));
          correct_word_boolean["wordone"] = false;
          localStorage.setItem("wordone","1");
          //ans_word1 = "";
        }
        if (correct_word_boolean["wordtwo"] == true) {
          var multiplier = parseInt(((document.getElementById("time") as HTMLSpanElement).innerHTML).toString()[1]);
          if (multiplier == 0) {
            multiplier = 1;
          }
          (document.getElementById("score") as HTMLHeadElement).innerHTML = (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString();

          
          const elements = document.getElementsByClassName('word2');
          for (let i = 0; i < elements.length; i++) {
            const input = elements[i] as HTMLInputElement;
            input.remove();
          }  
          const elements_img = document.getElementsByClassName('wordtwoImg');
          for (let i = 0; i < elements_img .length; i++) {
            const input = elements_img[i] as HTMLImageElement;
            input.src = "../../assets/tileCorrect.png";
          }         
        
          localStorage.setItem('score', (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString());
          console.log(localStorage.getItem('score'));
          correct_word_boolean["wordtwo"] = false;
          localStorage.setItem("wordtwo","1");
          //ans_word2 = "";
        }
        if (correct_word_boolean["wordthree"] == true) {
          var multiplier = parseInt(((document.getElementById("time") as HTMLSpanElement).innerHTML).toString()[1]);
          if (multiplier == 0) {
            multiplier = 1;
          }
          (document.getElementById("score") as HTMLHeadElement).innerHTML = (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString();

          
          const elements = document.getElementsByClassName('word3');
          for (let i = 0; i < elements.length; i++) {
            const input = elements[i] as HTMLInputElement;
            input.remove();
          }
          const elements_img = document.getElementsByClassName('wordthreeImg');
          for (let i = 0; i < elements_img .length; i++) {
            const input = elements_img[i] as HTMLImageElement;
            input.src = "../../assets/tileCorrect.png";
          }          
        
          localStorage.setItem('score', (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString());
          console.log(localStorage.getItem('score'));
          correct_word_boolean["wordthree"] = false;
          localStorage.setItem("wordthree","1");
          //ans_word3 = "";
        }
       // if (correct_word_boolean["wordone"] == true &&  correct_word_boolean["wordtwo"] == true) {
       //   (document.getElementById("score") as HTMLHeadElement).innerHTML = "20";
        //  localStorage.setItem('score', (document.getElementById("score") as HTMLHeadElement).innerHTML);

       // }
        //if (correct_word_boolean["wordone"] == true &&  correct_word_boolean["wordthree"] == true) {
        //  (document.getElementById("score") as HTMLHeadElement).innerHTML = "20";
        //  localStorage.setItem('score', (document.getElementById("score") as HTMLHeadElement).innerHTML);

        //}
        //if (correct_word_boolean["wordtwo"] == true &&  correct_word_boolean["wordthree"] == true) {
        //  (document.getElementById("score") as HTMLHeadElement).innerHTML = "20";
        //  localStorage.setItem('score', (document.getElementById("score") as HTMLHeadElement).innerHTML);

        //}
        if ((localStorage.getItem("wordone")) == "1" &&  (localStorage.getItem("wordtwo")) == "1" &&  (localStorage.getItem("wordthree")) == "1") {
          //(document.getElementById("score") as HTMLHeadElement).innerHTML = "30";
          //localStorage.setItem('score', (document.getElementById("score") as HTMLHeadElement).innerHTML);
          //this.addToLeaderboard(localStorage.getItem("name"), localStorage.getItem("score")  );
          
          var next = document.getElementById("next");
          (next as HTMLHeadElement).style.display = "block";
          namee = localStorage.getItem('name');
          score = localStorage.getItem('score');
          console.log(namee);
          console.log(score);
        }

        
      },

      ondragleave(event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;
        dropzoneElement.textContent = ''
      },

      ondrop(event) {
        event.target.classList.add('dropped');
      },

      ondropdeactivate(event) {
        event.target.classList.remove('dropped');
      }
    });
    }
}
