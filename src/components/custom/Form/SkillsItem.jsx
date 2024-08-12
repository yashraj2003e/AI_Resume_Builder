function SkillItem({ tabIndex }) {
  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
        <h2 className="font-bold text-lg">
          Education {tabIndex + 1}{" "}
          {tabIndex === 3
            ? "(Maximum of 4 Educational Details can be added)"
            : ""}
        </h2>
      </div>
    </div>
  );
}

export default SkillItem;
