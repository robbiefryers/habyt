export enum ButtonTheme {
  Black
}

export const ButtonVariants: Record<string, string> = {
  [ButtonTheme.Black]: 'bg-black text-white hover:bg-white p-2 hover:text-black border-2 rounded-lg block min-w-40 text-center',
};




export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export enum EmploymentStatus {
  employed = 'employed',
  self_employed = 'self_employed',
  student = 'student',
  other = 'other',
}


export enum MonthlyIncome {
  low = 'low',
  lower_mid = 'lower_mid',
  mid = 'mid',
  higher_mid = 'higher_mid',
  high = 'high'
}




export const CityIncomeBands: { [city: string]: { [income in MonthlyIncome]: string } } = {
  'berkely': {
    [MonthlyIncome.low]: '<$1000',
    [MonthlyIncome.lower_mid]: '<$1000-$2000',
    [MonthlyIncome.mid]: '<$2000-$3000',
    [MonthlyIncome.higher_mid]: '<$3000-$5000',
    [MonthlyIncome.high]: '>$5000'
  },
  'madrid': {
    [MonthlyIncome.low]: '<€750',
    [MonthlyIncome.lower_mid]: '€750-€1500',
    [MonthlyIncome.mid]: '€1500-€2500',
    [MonthlyIncome.higher_mid]: '€2500-€3500',
    [MonthlyIncome.high]: '>€3000'
  }
}

