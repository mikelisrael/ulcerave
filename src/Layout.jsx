import { useGlobalContext } from "./context";

function App() {
  const { name } = useGlobalContext();

  return (
    <>
      <p className="text-[#d74]">{name}</p>
    </>
  );
}

export default App;
