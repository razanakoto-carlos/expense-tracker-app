import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthForm from "../components/AuthForm";
import { login } from "../api/expense.api";
import type { AuthCredentials } from "../types";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => console.error("Login failed"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm<AuthCredentials> title="Login" onSubmit={mutate} />
    </div>
  );
}

export default Login;
