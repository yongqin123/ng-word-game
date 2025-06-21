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
  
  sendPostRequestToHome() {
    const postData = { name : localStorage.getItem('name'), score : localStorage.getItem('score') }; // Replace with your data
    this.leaderboardService.addLeaderboard(postData).subscribe()
    window.location.href = "/";
  }
  
  sendPostRequestToGame() {
    const postData = { name : localStorage.getItem('name'), score : localStorage.getItem('score') }; // Replace with your data
    this.leaderboardService.addLeaderboard(postData).subscribe()
    window.location.href = "/game";
  }  
  
  
    ngOnInit(): void { 
      // target elements with the "draggable" class
      this.initializeInteract(this.word1, this.word2, this.word3, this.correct_word_boolean);
      //this.addToLeaderboard();
      
    }
    initializeInteract( word1: string,  word2: string,  word3: string, correct_word_boolean: {wordone:boolean, wordtwo:boolean, wordthree:boolean}): void {
      var namee = localStorage.getItem('name');
      var score = localStorage.getItem('score');
      localStorage.setItem("wordone","0");
      localStorage.setItem("wordtwo","0");
      localStorage.setItem("wordthree","0");

      window.onload = function() {
        var minute = 6;
        var sec = 1;

        //index 0 of first word
        const target1 = document.getElementById(word1[0]);
        var rect = (target1 as HTMLElement).getBoundingClientRect();
        (target1 as HTMLElement).style.transform = `translate(${190 - rect.left}px, ${280 - rect.top}px)`;
        target1?.setAttribute('data-x', "80");
        target1?.setAttribute('data-y', "-500");
        document.getElementsByClassName("word1")[0].innerHTML = word1[0];
        (target1 as HTMLElement).removeAttribute('id');
        document.getElementsByClassName("word1")[0].classList.remove("dropzone");
        (document.getElementsByClassName("word1")[0] as HTMLElement).setAttribute("name", (target1 as HTMLElement).className.split(' ')[1]); 

        //index 2 of first word
        const target2 = document.getElementById(word1[2]);
        var rect = (target2 as HTMLElement).getBoundingClientRect();
        (target2 as HTMLElement).style.transform = `translate(${450 - rect.left}px, ${-500}px)`;
        target2?.setAttribute('data-x', "80");
        target2?.setAttribute('data-y', "-500");
        document.getElementsByClassName("word1")[2].innerHTML = word1[2];
        (target2 as HTMLElement).removeAttribute('id');
        document.getElementsByClassName("word1")[2].classList.remove("dropzone");
        (document.getElementsByClassName("word1")[2] as HTMLElement).setAttribute("name", (target2 as HTMLElement).className.split(' ')[1]); 

        //index 0 of second word
        const target3 = document.getElementById(word2[0]);
        var rect = (target3 as HTMLElement).getBoundingClientRect();
        (target3 as HTMLElement).style.transform = `translate(${190 - rect.left}px, ${460 - rect.top}px)`;
        target3?.setAttribute('data-x', "80");
        target3?.setAttribute('data-y', "-500");
        document.getElementsByClassName("word2")[0].innerHTML = word2[0];
        (target3 as HTMLElement).removeAttribute('id');
        (document.getElementById("box0") as HTMLInputElement).classList.remove("dropzone");
        document.getElementsByClassName("word2")[0].classList.remove("dropzone");
        
        //index 2 of third word
        const target4 = document.getElementById(word2[2]);
        var rect = (target4 as HTMLElement).getBoundingClientRect();
        (target4 as HTMLElement).style.transform = `translate(${450 - rect.left}px, ${460 - rect.top}px)`;
        target4?.setAttribute('data-x', "80");
        target4?.setAttribute('data-y', "-500");
        document.getElementsByClassName("word2")[2].innerHTML = word2[2];
        (target4 as HTMLElement).removeAttribute('id');
        document.getElementsByClassName("word2")[2].classList.remove("dropzone");


        //index 0 of third word
        const target5 = document.getElementById(word3[0]);
        var rect = (target5 as HTMLElement).getBoundingClientRect();
        (target5 as HTMLElement).style.transform = `translate(${190 - rect.left}px, ${630 - rect.top}px)`;
        target5?.setAttribute('data-x', "80");
        target5?.setAttribute('data-y', "-500");
        document.getElementsByClassName("word3")[0].innerHTML = word3[0];
        (target5 as HTMLElement).removeAttribute('id');
        document.getElementsByClassName("word3")[0].classList.remove("dropzone");

        //index 2 of third word
        const target6 = document.getElementById(word3[2]);
        var rect = (target6 as HTMLElement).getBoundingClientRect();
        (target6 as HTMLElement).style.transform = `translate(${450 - rect.left}px, ${630 - rect.top}px)`;
        target6?.setAttribute('data-x', "80");
        target6?.setAttribute('data-y', "-500");
        document.getElementsByClassName("word3")[2].innerHTML = word3[2];
        (target4 as HTMLElement).removeAttribute('id');
        document.getElementsByClassName("word3")[2].classList.remove("dropzone");


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
          
          if (minute == 0 && sec == 0) {
            console.log("game end");
            var game = document.getElementById("game");
            (game as HTMLDivElement).remove();

            var gameover = document.getElementById("gameover");
            (gameover as HTMLDivElement).removeAttribute("hidden");
          }

      

        }, 1000);
      }

      interact('.draggable')
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            if (target?.classList.contains("locked")) {
              return; // prevent dragging
            }
            //console.log(target);
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

             const parent = target.parentElement;
            
          }
        }
      });

    interact('.dropzone').dropzone({
      accept: '.draggable',
      overlap: 0.75,

      ondragenter(event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;
        //dropzoneElement.classList.remove("dropZone");
        dropzoneElement.textContent = draggableElement.innerHTML;
        //console.log(draggableElement.className.split(' ')[1]);
        dropzoneElement.name = draggableElement.className.split(' ')[1];
        
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
          var ele = document.getElementsByClassName("word1");
          for (let i = 0; i < ele.length; i ++) {
            console.log((ele[i] as HTMLInputElement).getAttribute("name"));
            console.log(document.getElementsByClassName((ele[i] as HTMLInputElement).getAttribute("name") ?? '0')[0]);
            document.getElementsByClassName((ele[i] as HTMLInputElement).getAttribute("name") ?? '0')[0].classList.add("locked");
            
          }
        
          var multiplier = parseInt(((document.getElementById("time") as HTMLSpanElement).innerHTML).toString()[1]);
          if (multiplier == 0) {
            multiplier = 1;
          }
          (document.getElementById("score") as HTMLHeadElement).innerHTML = (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString();

          const elements = document.getElementsByClassName('word1');
          //const elements = document.getElementsByClassName('wordone');
          //console.log(elements);
          //console.log(elements.length)
          for (let i = 0; i < elements.length; i++) {
            const input = elements[i] as HTMLInputElement;
            console.log(input);
            input.classList.remove("dropzone");
            input.innerHTML='';
          }
          //while(elements.length > 0) {
          //  const input = elements[0] as HTMLInputElement;
          //  input.parentNode?.removeChild(elements[0])
          //}


          const elements_img = document.getElementsByClassName('wordoneImg');
          for (let i = 0; i < elements_img.length; i++) {
            const input = elements_img[i] as HTMLImageElement;
            input.src = "../../assets/tileCorrect.png";
          }      
        
          localStorage.setItem('score', (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString());
          console.log(localStorage.getItem('score'));
          correct_word_boolean["wordone"] = false;
          localStorage.setItem("wordone","1");
          ans_word1 = "";
        }
        if (correct_word_boolean["wordtwo"] == true) {
          var ele = document.getElementsByClassName("word2");
          for (let i = 0; i < ele.length; i ++) {
            console.log((ele[i] as HTMLInputElement).getAttribute("name"));
            console.log(document.getElementsByClassName((ele[i] as HTMLInputElement).getAttribute("name") ?? '0')[0]);
            document.getElementsByClassName((ele[i] as HTMLInputElement).getAttribute("name") ?? '0')[0].classList.add("locked");
            
          }

          var multiplier = parseInt(((document.getElementById("time") as HTMLSpanElement).innerHTML).toString()[1]);
          if (multiplier == 0) {
            multiplier = 1;
          }
          (document.getElementById("score") as HTMLHeadElement).innerHTML = (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString();

          
          const elements = document.getElementsByClassName('word2');
          for (let i = 0; i < elements.length; i++) {
            const input = elements[i] as HTMLInputElement;
            input.classList.remove("dropzone");
            input.innerHTML='';

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
          ans_word2 = "";
        }
        if (correct_word_boolean["wordthree"] == true) {
          var ele = document.getElementsByClassName("word3");
          for (let i = 0; i < ele.length; i ++) {
            console.log((ele[i] as HTMLInputElement).getAttribute("name"));
            console.log(document.getElementsByClassName((ele[i] as HTMLInputElement).getAttribute("name") ?? '0')[0]);
            document.getElementsByClassName((ele[i] as HTMLInputElement).getAttribute("name") ?? '0')[0].classList.add("locked");
            
          }

          var multiplier = parseInt(((document.getElementById("time") as HTMLSpanElement).innerHTML).toString()[1]);
          if (multiplier == 0) {
            multiplier = 1;
          }
          (document.getElementById("score") as HTMLHeadElement).innerHTML = (parseInt(localStorage.getItem('score') ?? "0") +  (10 * multiplier * 0.5)).toString();

          
          const elements = document.getElementsByClassName('word3');
          for (let i = 0; i < elements.length; i++) {
            const input = elements[i] as HTMLInputElement;
            input.classList.remove("dropzone");
            input.innerHTML='';

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
          ans_word3 = "";
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
          
          //var next = document.getElementById("next");
          
          console.log("namee");
          console.log(score);
          console.log("game end");
          var game = document.getElementById("game");
          (game as HTMLDivElement).remove();

          var gameover = document.getElementById("gameover");
          (gameover as HTMLDivElement).removeAttribute("hidden");
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
