const FormButton = ({ buttonText }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold"
        // className="w-full h-3/4 bg-blue-500"
      >
        {buttonText}
      </button>
    </>
  );
};

export default FormButton;
