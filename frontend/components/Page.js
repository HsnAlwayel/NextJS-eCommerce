import Header from "./Header";
import { GlobalStyles, InnerStyles } from "./styles/GlobalStyles";

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <p>Im a Page Component</p>
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}
