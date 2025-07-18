import Laoder from "../Loader";

export default function ButtonSubmit({ isLoading, children, ...props }) {
    return (
        <button className="button" type="submit" {...props}>
            {isLoading ? (
                <Laoder />
            ) : (
                children
            )}
        </button>
    )
}