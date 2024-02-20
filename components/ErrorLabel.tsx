
type Props = {
  error: string | undefined;
}

export const ErrorLabel = ({ error }: Props) => (
  error && <small className="text-xs text-red-600">{ error }</small>
)
