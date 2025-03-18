const FormInput = ({ value, setValue, placeholder, type }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg outline-cyan-100"
      />
    </>
  );
};

export default FormInput;
