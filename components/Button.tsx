
type Props = {
  label: string;
  disabled: boolean;
  on_click: () => void;
}

export const Button = ({ disabled = false, label, on_click }: Props) => (
  <button
    type="button"
    disabled={ disabled }
    onClick={ on_click }
    className='bg-black text-white hover:bg-white hover:white p-2 border-2 border-black'>
    { label }
  </button>
)