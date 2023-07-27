import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) {}

  getTriviaQuestions(amount: number, category: number, difficulty: string, type: string): Observable<any> {
    const url = `${this.apiUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        return response.results;
      })
    );
  }
}