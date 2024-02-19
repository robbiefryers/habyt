'use client';

import { SubmitButton } from "@/components/SubmitButton";
import { ButtonTheme, EmploymentStatus, MonthlyIncome } from "@/consts";
import { bookingFinancialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { countries } from 'countries-list';

type FormData = z.infer<typeof bookingFinancialSchema>;


export type Props = {
  stepComplete: () => void
}

export function FinancialDetailsStep({ stepComplete }: Props) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bookingFinancialSchema),
    defaultValues: {
      nationality: searchParams.get('nationality') ?? '',
      national_id: searchParams.get('national_id') ?? '',
      employment_status: searchParams.get('employment_status') as EmploymentStatus ?? '',
      monthly_income: searchParams.get('monthly_income') as MonthlyIncome ?? '',
      move_in: searchParams.get('move_in') ?? ''
    }
  });



  const onSubmit: SubmitHandler<FormData> = (data) => {
    const params = new URLSearchParams(searchParams);
    params.set('nationality', data.nationality);
    params.set('national_id', data.national_id);
    params.set('employment_status', data.employment_status);
    params.set('monthly_income', data.monthly_income);
    params.set('move_in', data.move_in);
    replace(`${ pathname }?${ params.toString() }`);
    stepComplete();
  }


  const i = "mt-1 w-full rounded-lg bg-white p-3 border text-[13px] focus:ring-opacity-50 border-gray-300 placeholder:text-sm leading-3 focus:ring-common-blue focus:border-common-blue focus:ring"


  return (
    <form onSubmit={ handleSubmit(onSubmit) }>

      <div className="flex flex-col gap-4 p-4">

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Nationality</label>
            <select { ...register("nationality") } className={ i }>
              { Object.entries(countries).map(([key, country]) => {
                return <option key={ key } value={ key }>{ country.name }</option>
              }) }
            </select>
            { errors.nationality && <small className="text-xs text-red-600">{ errors.nationality.message }</small> }
          </div>
          <div className="flex-1">
            <label className="text-xs text-neutral-500">National ID</label>
            <input className={ i } placeholder="National ID" { ...register("national_id") } />
            { errors.national_id && <small className="text-xs text-red-600">{ errors.national_id.message }</small> }
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Employment status</label>
            <select { ...register("employment_status") } className={ i }>
              { Object.entries(EmploymentStatus).map(([key, status]) => {
                return <option key={ key } value={ key }>{ status.replace('_', ' ').toUpperCase() }</option>
              }) }
            </select>
            { errors.employment_status && <small className="text-xs text-red-600">{ errors.employment_status.message }</small> }
          </div>
          <div className="flex-1">
          <label className="text-xs text-neutral-500">Monthly Income</label>
            <select { ...register("monthly_income") } className={ i }>
              { Object.entries(MonthlyIncome).map(([key, status]) => {
                return <option key={ key } value={ key }>{ status.replace('_', ' ').toUpperCase() }</option>
              }) }
            </select>
            { errors.monthly_income && <small className="text-xs text-red-600">{ errors.monthly_income.message }</small> }
          </div>
        </div>

        <div>
            <label className="text-xs text-neutral-500">Move in date</label>
            <input type="date" className={i} { ...register("move_in") } />
            { errors.move_in && <small className="text-xs text-red-600">{ errors.move_in.message }</small> }
          </div>

      </div>

      <div className="p-4">
        <SubmitButton label="Next" disabled={ false } />
      </div>

    </form>
  )
}