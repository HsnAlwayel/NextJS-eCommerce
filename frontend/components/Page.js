import Header from "./Header";

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <p>Im a Page Component</p>
      {children}
    </div>
  );
}
