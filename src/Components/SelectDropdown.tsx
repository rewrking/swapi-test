import React, { useEffect, useState } from "react";
import styled from "styled-components";

export type SelectOption = {
	value: string;
	label: string;
};

type Props = {
	name: string;
	label?: string;
	defaultValue?: string;
	onChange?: (value: SelectOption) => Promise<void> | void | Promise<boolean> | boolean;
	options: SelectOption[];
};

const SelectDropdown = ({ name, label, options, onChange, defaultValue }: Props) => {
	const [value, setValue] = useState<string>(defaultValue ?? options?.[0].value ?? "");
	useEffect(() => {
		if (!!defaultValue) setValue(defaultValue);
	}, [defaultValue]);
	return (
		<div className="select-dropdown">
			{!!label && <label htmlFor={name}>{label}: </label>}
			<select
				name={name}
				value={value}
				onChange={async (ev) => {
					ev.preventDefault();
					for (const option of options) {
						if (option.value === ev.target.value) {
							setValue(option.value);
							await onChange?.(option);
							break;
						}
					}
				}}
			>
				{options.map(({ value, label }, i) => {
					return (
						<option value={value} key={i}>
							{label}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export { SelectDropdown };
