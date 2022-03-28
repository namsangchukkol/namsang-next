import { React, useState } from 'react'
import Select from 'react-select'
import { customStyles } from '../../settings/select.styling'

export default function MyDropDown({
    options,
    placeholder = '',
    ...otherProps
}) {
    return (
        <>
            <select>
                {options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
            {/* <Select {...otherProps} options={options} placeholder={placeholder} styles={customStyles} /> */}
        </>
    )
}
