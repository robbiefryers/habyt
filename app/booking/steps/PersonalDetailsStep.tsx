'use client';

import { SubmitButton } from "@/components/SubmitButton";
import { Gender } from "@/consts";
import { bookingPersonalSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
type FormData = z.infer<typeof bookingPersonalSchema>;

export type Props = {
  stepComplete: () => void
}

export function PersonalDetailsStep({ stepComplete }: Props) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  type FormData = z.infer<typeof bookingPersonalSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bookingPersonalSchema),
    defaultValues: {
      first_name: searchParams.get('first_name') ?? '',
      last_name: searchParams.get('last_name') ?? '',
      email: searchParams.get('email') ?? '',
      phone: searchParams.get('phone') ?? '',
      dob: searchParams.get('dob') ?? '',
      gender: searchParams.get('gender') as Gender ?? ''
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const params = new URLSearchParams(searchParams);
    params.set('first_name', data.first_name);
    params.set('last_name', data.last_name);
    params.set('email', data.email);
    params.set('phone', data.phone);
    params.set('dob', data.dob);
    params.set('gender', data.gender)
    replace(`${ pathname }?${ params.toString() }`);
    stepComplete();
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>

      <div className="flex flex-col gap-4 p-4">

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <input type="text" placeholder="First Name" { ...register("first_name") } />
            { errors.first_name && <small className="text-xs text-red-600">{ errors.first_name.message }</small> }
          </div>
          <div className="flex-1">
            <input type="text" placeholder="Last Name" { ...register("last_name") } />
            { errors.last_name && <small className="text-xs text-red-600">{ errors.last_name.message }</small> }
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <input type="email" placeholder="Email" { ...register("email") } />
            { errors.email && <small className="text-xs text-red-600">{ errors.email.message }</small> }
          </div>
          <div className="flex-1">
            <input type="tel" placeholder="Phone" { ...register("phone") } />
            { errors.phone && <small className="text-xs text-red-600">{ errors.phone.message }</small> }
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Date of birth</label>
            <input type="date" placeholder="Date of birth" { ...register("dob") } />
            { errors.dob && <small className="text-xs text-red-600">{ errors.dob.message }</small> }
          </div>
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Gender</label>
            <select { ...register("gender") }>
              <option value={ Gender.female }>Female</option>
              <option value={ Gender.male }>Male</option>
              <option value={ Gender.other }>Other</option>
            </select>
            { errors.gender && <small className="text-xs text-red-600">{ errors.gender.message }</small> }
          </div>
        </div>
      </div>

      <div className="p-4">
        <SubmitButton label="Next" disabled={ false } />
      </div>

    </form>
  )
}