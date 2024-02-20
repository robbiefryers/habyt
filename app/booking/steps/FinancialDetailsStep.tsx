'use client';

import { SubmitButton } from "@/components/SubmitButton";
import { EmploymentStatus, MonthlyIncome } from "@/consts";
import { bookingFinancialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { countries } from 'countries-list';
import { ErrorLabel } from "@/components/ErrorLabel";
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

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>

      <div className="flex flex-col gap-4 p-4">

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Nationality</label>
            <select { ...register("nationality") }>
              { Object.entries(countries).map(([key, country]) => {
                return <option key={ key } value={ key }>{ country.name }</option>
              }) }
            </select>
            <ErrorLabel error={ errors.nationality?.message } />
          </div>
          <div className="flex-1">
            <label className="text-xs text-neutral-500">National ID</label>
            <input placeholder="National ID" { ...register("national_id") } />
            <ErrorLabel error={ errors.national_id?.message } />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Employment status</label>
            <select { ...register("employment_status") }>
              { Object.entries(EmploymentStatus).map(([key, status]) => {
                return <option key={ key } value={ key }>{ status.replace('_', ' ').toUpperCase() }</option>
              }) }
            </select>
            <ErrorLabel error={ errors.employment_status?.message } />
          </div>
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Monthly Income</label>
            <select { ...register("monthly_income") }>
              { Object.entries(MonthlyIncome).map(([key, status]) => {
                return <option key={ key } value={ key }>{ status.replace('_', ' ').toUpperCase() }</option>
              }) }
            </select>
            <ErrorLabel error={ errors.monthly_income?.message } />
          </div>
        </div>

        <div>
          <label className="text-xs text-neutral-500">Move in date</label>
          <input type="date" { ...register("move_in") } />
          <ErrorLabel error={ errors.move_in?.message } />
        </div>
      </div>

      <div className="p-4">
        <SubmitButton label="Next" disabled={ false } />
      </div>

    </form>
  )
}