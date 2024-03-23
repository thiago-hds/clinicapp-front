import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface CepCustomInputProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const CepCustomInput = forwardRef<HTMLInputElement, CepCustomInputProps>(
	function CepCustomInput(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="00-000-000]"
				inputRef={ref}
				onAccept={(value: any) =>
					onChange({ target: { name: props.name, value } })
				}
				overwrite
			/>
		);
	}
);

export default CepCustomInput;
