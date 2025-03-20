const FormInput = ({ type, placeholder, value, onChange }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg outline-cyan-100"
      />
    </>
  );
};

export default FormInput;
