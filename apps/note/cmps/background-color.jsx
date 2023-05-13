
export function BackgroundColor({ onSetNoteStyle, toggleColorPalette }) {
    // console.log(key);
    const colors = [
        '#fdcfe880',
        '#d7aefb80',
        '#aecbfa80',
        '#a7ffeb80',
        '#cbf0f880',
        '#ccff9080',
        '#fff47580',
        '#FDBC1C80',
        '#f28b8280'
    ]


    function onChooseColor(color) {
        const newStyle = { backgroundColor: color }
        toggleColorPalette()
        onSetNoteStyle(newStyle)
    }

    return (
        <section className="bgc-pallet-container">
            {
                colors.map(color => 
                <div
                    className="color-input"
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => onChooseColor(color)}
                ></div>)
            }
        </section>
    )
}