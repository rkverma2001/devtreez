// Spam trap: hidden from people (and screen readers), but bots tend to fill it in.
// The backend silently discards any submission where it has a value.
export default function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
