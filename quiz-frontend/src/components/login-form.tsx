"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUserInfo } from "@/lib/state/user/userSlice";

type LoginFields = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>();

  // const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (
        response.status !== 200 
        // ||
        // !response.data ||
        // !response.data.accessToken
      ) {
        throw new Error("Login failed");
      }
      // setToken(response.data.accessToken);

      // dispatch(setUserInfo(response.data));
    } catch {
      setError("root", {
        type: "manual",
        message: "Login failed",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && <div className="text-red-600">{errors.root.message}</div>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) =>
                      /^\S+@\S+\.\S+$/.test(value) || "Invalid email format",
                  })}
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <div className="text-red-600">{errors.email.message}</div>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                />
                {errors.password && (
                  <div className="text-red-600">{errors.password.message}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Login..." : "Login"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
