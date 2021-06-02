import Link from "next/link";
import Nav from "./Nav";
import Title from "./styles/Title";
export default function Header() {
  return (
    <header>
      <div className="bar">
        <Title>
          <Link href="/">Sick fits</Link>
        </Title>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
}
