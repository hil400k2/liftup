import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  press = 0;
  squats = 0;
  deadlift = 0;
  user$;

  constructor(
    private planService: PlanService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.user$ = this.authService.user$;

    this.planService.getPlan()
      .subscribe((plan: any) => {
        this.press = plan.press;
        this.squats = plan.squats;
        this.deadlift = plan.deadlift;
      });
  }

  update(values) {
    this.planService.updateScores(values)
      .subscribe();
  }

  calculatePress(percentage) {
    return this.press ? ((percentage * this.press).toFixed(2) + ' = ' + percentage) : '';
  }

  calculateSquats(percentage) {
    return this.squats ? ((percentage * this.squats).toFixed(2) + ' = ' + percentage) : '';
  }

  calculateDeadlift(percentage) {
    return this.deadlift ? ((percentage * this.deadlift).toFixed(2) + ' = ' + percentage) : '';
  }

}
