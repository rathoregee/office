import { useAuth } from "../hooks/useAuth";
export function SuccessPage() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <h1>Loading ....</h1>;
    }

    return (
        <button
            onClick={() => auth.signOut()}
        >
            Log out
        </button>
    );
}
