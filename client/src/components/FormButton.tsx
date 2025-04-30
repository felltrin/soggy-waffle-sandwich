const FormButton = ({ buttonText }: { buttonText: string}) => {
  return (
    <>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold cursor-pointer"
      >
        {buttonText}
      </button>
    </>
  );
};

export default FormButton;
