

const Input = ({svg, type, placeholder, validator, ...others}) => {
  return (
<>
<label className="input validator">
      {svg}
  <input
    type={type}
    required
    placeholder={placeholder}
    {...others}
  />
</label>
<p className="validator-hint">
  {validator}
</p>
   </>
  )
}

export default Input