import './shared.css'

export default function FadeOverlay({ height = "60%" }) {
  return <div className="fade-overlay" style={{ height }} />;
}