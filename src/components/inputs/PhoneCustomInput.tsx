import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface PhoneCustomInputProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const PhoneCustomInput = forwardRef<HTMLInputElement, PhoneCustomInputProps>(
	function PhoneCustomInput(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="(00) 0000-0000[0]"
				inputRef={ref}
				onAccept={(value: any) =>
					onChange({ target: { name: props.name, value } })
				}
				overwrite
			/>
		);
	}
);

export default PhoneCustomInput;
