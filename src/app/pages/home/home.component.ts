/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'HomeComponent';

  teamArray = [];
  teamArrayMockup = [
    [
      {
        name: 'Player 1',
        team: 'A'
      },
      {
        name: 'Player 2',
        team: 'B'
      }
    ],
    [
      {
        name: 'Player 3',
        team: 'A'
      },
      {
        name: 'Player 4',
        team: 'B'
      }
    ],
    [
      // {
      //   name: 'Player 5',
      //   team: 'A'
      // },
      {
        name: null,
        team: null
      },
      {
        name: 'Player 5',
        team: 'B'
      },
    ],
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    console.log(`[${this.title}#ngOnInit] teamArrayMockup`, this.teamArrayMockup);
    // this.teamArray = this.teamArrayMockup; //! TEMP

    console.log(`[${this.title}#ngOnInit] teamArray`, this.teamArray);
  }

  updateView() {
    console.log(`[${this.title}#updateView]`);

    this.cdr.detectChanges;
    this.app.updateView(this.title);
  }

  async redirectTo(url: any) {
    await this.app.redirectTo(url, this.title);

    this.updateView();
  }

  sortTeams() {
    console.log(`[${this.title}#sortTeams]`);

    const player1 = document.getElementById('player1') as HTMLInputElement;
    console.log(`[${this.title}#sortTeams] player1`, player1);
    console.log(`[${this.title}#sortTeams] player1.value`, player1.value);

    if (player1.value === '') { alert('Player A is empty'); return; }

    const player2 = document.getElementById('player2') as HTMLInputElement;
    console.log(`[${this.title}#sortTeams] player2`, player2);
    console.log(`[${this.title}#sortTeams] player2.value`, player2.value);

    if (player2.value === '') { alert('Player B is empty'); return; }

    const randomTeam = Math.round(Math.random()) ? 'A' : 'B';
    console.log(`[${this.title}#sortTeams] randomTeam`, randomTeam);

    this.teamArray.push([
      {
        name: (randomTeam === 'A') ? player1.value : player2.value,
        team: 'A'
      },
      {
        name: (randomTeam === 'B') ? player1.value : player2.value,
        team: 'B'
      }
    ]);

    // player1.value = '';
    // player2.value = '';

    console.log(`[${this.title}#sortTeams] teamArray`, this.teamArray);
  }
}
