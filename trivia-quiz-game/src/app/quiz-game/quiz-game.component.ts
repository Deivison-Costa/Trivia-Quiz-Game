import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css']
})
export class QuizGameComponent implements OnInit {
  currentQuestion: any;
  questions: any[] = [];
  score: number = 0;
  isQuizFinished: boolean = false;

  numOfQuestions: number = 10;
  selectedCategory: number = 18;
  selectedDifficulty: string = 'easy';
  selectedType: string = 'multiple';

  categories: any[] = [
    { id: 9, name: 'General Knowledge' },
    { id: 10, name: 'Entertainment: Books' },
    { id: 11, name: 'Entertainment: Film' },
    { id: 12, name: 'Entertainment: Music' },
    { id: 13, name: 'Entertainment: Musicals & Theatres' },
    { id: 14, name: 'Entertainment: Television' },
    { id: 15, name: 'Entertainment: Video Games' },
    { id: 16, name: 'Entertainment: Board Games' },
    { id: 17, name: 'Science & Nature' },
    { id: 18, name: 'Science: Computers' },
    { id: 19, name: 'Science: Mathematics' },
    { id: 20, name: 'Mythology' },
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 24, name: 'Politics' },
    { id: 25, name: 'Art' },
    { id: 26, name: 'Celebrities' },
    { id: 27, name: 'Animals' },
    { id: 28, name: 'Vehicles' },
    { id: 29, name: 'Entertainment: Comics' },
    { id: 30, name: 'Science: Gadgets' },
    { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
    { id: 32, name: 'Entertainment: Cartoon & Animations' },
  ];
  
  constructor(private quizService: QuizService, private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  loadTriviaQuestions() {
    this.quizService
      .getTriviaQuestions(this.numOfQuestions, this.selectedCategory, this.selectedDifficulty, this.selectedType)
      .subscribe(
        (questions) => {
          this.questions = questions;
          this.showNextQuestion();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  showNextQuestion() {
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions.pop();
      this.currentQuestion.options = this.shuffleOptions([
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ]);
    } else {
      this.currentQuestion = null; // No more questions, end of the game
      console.log('Game Over! Your score: ' + this.score);
    }
  }

  shuffleOptions(options: string[]): string[] {
    // Fisher-Yates shuffle algorithm
    for (let i = options.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [options[i], options[randomIndex]] = [options[randomIndex], options[i]];
    }

    return options;
  }

  checkAnswer(selectedOption: string) {
    if (selectedOption === this.currentQuestion.correct_answer) {
      console.log('Correct Answer!');
      this.score++;
    } else {
      console.log('Wrong Answer!');
    }
    this.showNextQuestion();
    if (!this.currentQuestion) {
      // Quiz is completed
      this.isQuizFinished = true;
    }
  }

  finishQuiz() {
    // Reset the quiz and show the first question again
    this.isQuizFinished = false;
    this.score = 0;
    this.showNextQuestion();
  }

  // Function to decode HTML entities
  decodeHTML(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
}