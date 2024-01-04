function Pagination({ total, onChange, current }) {
    const prev=<button disabled={current===1} onClick={()=>onChange(current-1)}>
        Prev
    </button>
    const next=<button disabled={current===total}  onClick={()=>onChange(current+1)}>
Next
    </button>
  const pages = new Array(total).fill(0).map((a, i) => (
    <button onClick={() => onChange(i + 1)} disabled={current === i + 1}>
      {" "}
      {i + 1}{" "}
    </button>
  ));

  return <div>
    {prev}
    {pages}
    {next}
    </div>;
}
export default Pagination;
