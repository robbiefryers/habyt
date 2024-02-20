type Props = {
  label: string;
  disabled: boolean;
}

export const SubmitButton = ({ disabled = false, label }: Props) => (
  <button
    type="submit"
    disabled={ disabled }
    className='black-btn'>
    { label }
  </button>
)