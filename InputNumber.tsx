// Welcome to Code in Framer
// Get Started: https://www.framer.com/developers/
import Example from "https://framer.com/m/framer/Example.js@^1.0.0"
import { useStore } from "./state.jsx"
import { addPropertyControls, ControlType } from "framer"
/**

 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

export default function InputNumber(props) {
    const [store, setStore] = useStore()
    const handleChange = (event) => {
        const innerValue = event.target.value
        if (innerValue === "") {
            //dont do anything
            return
        }
        if (parseFloat(innerValue) < 1) {
            event.target.value = 1
            return
        }
        setStore((prev) => ({ ...prev, [props.name]: innerValue }))
    }
    return (
        <input
            name={props.name}
            onChange={handleChange}
            type="number"
            min={"1"}
            defaultValue={store?.[props.name]}
            style={{
                WebkitAppearance: "none",
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                border: "1px solid #D3D3D3",
                paddingLeft: "5px",
                fontSize: "16px",
                fontFamily: "Roboto",
            }}
        />
    )
}
addPropertyControls(InputNumber, {
    name: {
        title: "name",
        type: ControlType.String,
    },
})
