import React from 'react'

export default function FormInput(
    {
        type = "text",
        label,
        labelColor = "red-main",
        bgColor = 'bg-white',
        data,
        id,
        ...otherProps
    }
) {
    return (
        <div className="text-white" id={id}>
                <p className={`text-${labelColor} mb-1`}>{label}</p>
                {type === "textarea" ? <textarea {...otherProps} className={`${bgColor} rounded-lg text-grey pt-5 pl-5`} /> :
                    <input {...otherProps} className={`${bgColor} w-full h-12 rounded-lg text-grey pl-5`} />
                }
            </div>
    )
}
