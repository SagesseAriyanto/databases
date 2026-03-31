export default function Navbar({ onNavigate }) {
  return (
    <nav style={{ marginBottom: 16 }}>
      <button onClick={() => onNavigate('home')}>Home</button>
      <button onClick={() => onNavigate('about')}>About</button>
    </nav>
  );
}
