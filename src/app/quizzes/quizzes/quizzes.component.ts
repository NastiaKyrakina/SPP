import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.pug',
  styleUrls: ['./quizzes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
