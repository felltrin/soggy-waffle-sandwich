const EmptyCard = ({ imgSrc, message }) => {
    return (
      <>
        <img src={imgSrc} />
        <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">{message}</p>
      </>
    );
}

export default EmptyCard;