type Props = {
  label: string;
  disabled: boolean;
}

export const SubmitButton = ({ disabled, label }: Props) => (
  <button
    type="submit"
    disabled={ disabled }
    className='rounded-lg w-full text-center 
      bg-black text-white hover:bg-white hover:text-black p-2 border-2 border-black '>
    { label }
  </button>
)