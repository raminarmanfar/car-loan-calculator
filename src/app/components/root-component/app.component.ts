import { Component, ɵɵsetComponentScope } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarLoanInfo } from '../../models/car-loan-info';
import { CarLoanResult } from '../../models/car-load-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  carForm = this.formBuilder.group({
    carPrice: [33970, Validators.required],
    deposit: [6794.00, Validators.required],
    interestRate: [1.99, Validators.required],
    loanLengthMonths: [48, Validators.required],
    monthlyPaymentAmount: [262.00, Validators.required]
  });

  constructor(private formBuilder: FormBuilder) {}

  onFormSubmit(): void {
    const result = this.calculate(this.carForm.value);
    console.log('>>>> result:', result);
  }

  private calculate(loanInfo: CarLoanInfo): CarLoanResult {
    console.log('>>>> loan info:', loanInfo);

    const result: CarLoanResult = {
      interestSum: 0,
      netLoanAmount: loanInfo.carPrice - loanInfo.deposit,
      totalLoanAmount: 0,
      totalPriceAfterInterest: 0,
      finalInstallment: 0
    };

    const interestRate = loanInfo.interestRate / 100;
    let interest = 0;
    let totalPaid = 0;
    for (let month = 0; month <= loanInfo.loanLengthMonths; month++) {
      interest = interestRate / 12 * (result.netLoanAmount - totalPaid + interest);
      totalPaid += loanInfo.monthlyPaymentAmount;
      console.log('>>>>> month:', month, 'total paid:', totalPaid, 'interest:', interest);
      result.interestSum += interest;
    }

    return result;
  }

}
