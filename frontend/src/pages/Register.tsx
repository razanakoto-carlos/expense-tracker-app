import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthForm from "../components/AuthForm";
import { register } from "../api/expense.api";
import type { RegisterCredentials } from "../types";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      
    },
    onError: () => console.error("Registration failed"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm<RegisterCredentials>
        title="Register"
        onSubmit={mutate}
        withName={true}
      />
    </div>
  );
}

export default Register;
