function ButtonLG({ children }) {
  return (
    <button className="w-full bg-white hover:bg-blue-365 text-blue-365 font-semibold hover:text-white py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:border-transparent ">
      {children}
    </button>
  );
}

export default ButtonLG;
