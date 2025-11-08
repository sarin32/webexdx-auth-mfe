import { useNavigate, useSearchParams } from "react-router-dom";
import { CLIENT_BASE_URL } from "@/config";

export function useLoginRedirect() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const redirect = () => {
		const app = searchParams.get("app");
		if (app) window.location.href = CLIENT_BASE_URL + app;
		else navigate("/apps");
	};

	return redirect;
}
