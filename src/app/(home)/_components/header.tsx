import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-2 text-sm">
          <li>
            <Link href={""}>Inicio</Link>{" "}
          </li>
          <li>Preço</li>
          <li>FAQ</li>
        </ul>

        <div>Links</div>

        <div>
          <h2>logo</h2>
        </div>
      </nav>
    </header>
  );
};

export default Header;
