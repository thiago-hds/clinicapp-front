import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface CpfCustomInputProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const CpfCustomInput = forwardRef<HTMLInputElement, CpfCustomInputProps>(
	function CpfCustomInput(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="000.000.000-00"
				inputRef={ref}
				onAccept={(value: any) =>
					onChange({ target: { name: props.name, value } })
				}
				overwrite
			/>
		);
	}
);

export default CpfCustomInput;
