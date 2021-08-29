export default function Button({ children, callback }) {
  return (
    <button
      onClick={callback}
      className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded transition duration-300 ease-in-out uppercase"
    >
      {children}
    </button>
  );
}
