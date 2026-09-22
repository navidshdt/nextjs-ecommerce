import { Label } from '../ui/label';
import { Input } from '../ui/input';

const name = 'price';
type FormInputNumberProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor="price" className="capitalize">
        Price (Toman)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 100000}
        required
      />
    </div>
  );
}
export default PriceInput;
