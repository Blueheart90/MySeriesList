export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="w-4 h-4 border rounded bg-light text-primary focus:ring-kiwi focus:ring border-primary"
            onChange={(e) => handleChange(e)}
        />
    );
}
