
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
    className='black-btn'>
    { label }
  </button>
)