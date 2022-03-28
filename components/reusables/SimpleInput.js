import React, { useEffect, useState } from 'react'

export default function SimpleInput({
    templateType = 'default',
    type = 'text',
    label,
    bgColor = 'bg-white',
    data,
    inputPosition = 'left',
    txtColor = 'white',
    ...otherProps
}) {
    const styles = {
        default:
            'lg:w-52 md:w-52 w-[80vw] h-[38px] rounded-lg text-grey pl-2 pr-2',
        flexible: 'w-full h-[38px] rounded-lg text-grey pl-2'
    }

    const [tType, settType] = useState('default')
    useEffect(() => {
        switch (templateType) {
            case 'default':
                return settType(styles.default)
            case 'flexible':
                return settType(styles.flexible)
            default:
                return settType(styles.default)
        }
    }, [templateType])

    // const [inputValue, setInputValue] = useState(value)

    return (
        <div className="text-white">
            {label && <p className="mb-2">{label}</p>}
            <input
                {...otherProps}
                className={`${bgColor} ${tType} text-${inputPosition} text-black pr-4 outline-red-500`}
            />
        </div>
    )
}
