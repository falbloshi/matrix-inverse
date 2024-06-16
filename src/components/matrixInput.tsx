import { useEffect, useRef, useState } from "react"
import matrixDisplay from "../utils/matrixDisplay"
import { useDebounce } from "../utils/hooks"
import { MathJax } from "better-react-mathjax"
import { deserializeState } from "../utils/stateSerializer"
import { useAppContext } from "../context/AppContext"

const MatrixInput: React.FC = () => {

  const {
    value,
    inputs,
    setInputs,
    display,
    setDisplay,
  } = useAppContext()



  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [errors, setErrors] = useState<string[]>([])


  const regEx = new RegExp("^-?[0-9]+(\/[1-9][0-9]*)?$");

  const debouncedInputs = useDebounce(inputs)

  useEffect(() => {
    const queryString = window.location.search
    if (queryString) {
      const deserializedState = deserializeState(queryString.slice(1))
      setInputs(deserializedState)
    }
  }, [setInputs])

  useEffect(() => {
    const validateInputs = () => {
      const newErrors: string[] = []

      debouncedInputs.forEach((newValue, index) => {
        const isRationalOrWhole = regEx.test(newValue);
        if (!isRationalOrWhole && newValue != "") {
          newErrors.push(`Wrong entry at R ${Math.floor(index / value) + 1} C ${Math.floor(index % value) + 1} - please use a whole or a rational number with "/" forward slash with leading negative sign (e.g -5/3)`);
        }
      });

      setErrors(newErrors)
    };

    validateInputs();
  }, [debouncedInputs]);


  const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newInputs = [...inputs];
    newInputs[index] = newValue;
    setInputs(newInputs);
  };

  useEffect(() => {
    const newInputs = Array(value * value).fill("")
    const newRefs = Array(value * value).fill(null)
    setInputs(newInputs)
    inputRefs.current = newRefs
  }, [value])

  const grid = []
  for (let i = 0;i < value;i++) {
    const row = []
    for (let j = 0;j < value;j++) {
      const index = i * value + j
      row.push(
        <input
          key={`${i}-${j}-${value}`}
          type="text"
          placeholder={`R${i + 1} C${j + 1}`}
          ref={el => (inputRefs.current[index] = el)}
          value={inputs[index]}
          onChange={handleInputChange(index)}
          className="font-pt-serif text-3xl border-b border-b-black p-2 focus:outline-none focus:bg-teal-100 placeholder:font-sans placeholder:text-sm max-w-36 placeholder:text-neutral-400"
        />
      )
    }
    grid.push(
      <div
        key={i}
        className="flex flex-wrap gap-4">
        {row}
      </div>
    )
  }

  useEffect(() => {
    if (inputs.every(item => item.trim() != "")) {
      const values: string = matrixDisplay(inputs)
      setDisplay(values)
    }
    else {
      setDisplay(null)
    }
  }, [inputs])

  return (
    <>
      <div className={`grid grid-cols-[${value}] gap-4`}>{grid}</div>
      {errors && errors.map(error => <p className="error my-4">{error}</p>)}
      <MathJax>{display}</MathJax>
    </>
  )
}

export default MatrixInput
