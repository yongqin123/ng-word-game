import {Injectable} from '@angular/core';
import { generate, count } from "random-words";


@Injectable({
  providedIn: 'root',
})
export class WordService {
  words: string[] = [ 'run', 'will', 'cat', 'dog', 'jam', 'law', 'one', 'ten', 'bird', 'tree', 'fan', 'apple', 'red', 'blue', 'age', 'aid','bad','bean','bank','bed','bell','car'];

  wordList: String[] = [];
  

  getRandomWord(): string {
    var word  = this.words[Math.floor(Math.random() * this.words.length)];
    this.wordList.push(word);
    this.words = this.words.filter(function(item) {
      return item !== word
  })
    return word;
  }

  getWordList(): Array<String> {
    return this.wordList;
  }
  
  getLetters(): Array<String> {
    var letters: String[] = [];
    for (let i = 0; i < this.wordList.length; i++) {
      for (let j = 0; j < this.wordList[i].length; j++)  {
        letters.push(this.wordList[i][j]);
      }
      
    }
    return letters.sort();
    
    
  }

  
}
