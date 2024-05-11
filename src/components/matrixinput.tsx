interface MatrixInputProps {
  value: number;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ value }) => {


  const numRows = value
  const grid = [];
  for (let i = 0;i < numRows;i++) {
    const row = [];
    for (let j = 0;j < numRows;j++) {
      row.push(<input
        key={`${i}-${j}`}
        type="text"
        placeholder={`R${i + 1} C${j + 1}`}
        className="font-pt-serif text-3xl border-b border-b-black p-2 focus:outline-none focus:bg-green-100 placeholder:font-sans placeholder:text-sm max-w-36 placeholder:text-neutral-400" />);
    }
    grid.push(<div key={i} className="flex flex-wrap gap-4">{row}</div>);
  }

  console.log(grid)
  return (
    <div className={`grid grid-cols-[${value}] gap-4`}>
      {grid}
    </div>
  )
}
export default MatrixInput
