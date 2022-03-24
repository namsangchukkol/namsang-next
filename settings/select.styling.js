export const customStyles = {
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    },
    control: (_, { selectProps: { bgColor } }) => ({
        backgroundColor: bgColor ? bgColor : 'white',
        display: 'flex',
        height: '38px',
        borderRadius: '10px'

    }),
}