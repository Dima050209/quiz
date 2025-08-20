"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { roles, User } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";

type RegisterFields = Omit<User, "id">;

export function AddUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>();
  const [roleListOpen, setRoleListOpen] = useState(false);

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    console.log(data)
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register new user</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <div className="text-red-600">{errors.root.message}</div>
            )}
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
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      value.length >= 5 ||
                      "Name too short, has to be 5 characters at least",
                  })}
                  type="text"
                  placeholder="name"
                />
                {errors.name && (
                  <div className="text-red-600">{errors.name.message}</div>
                )}
              </div>
              <Controller
                name="role"
                control={control}
                defaultValue="STUDENT" 
                rules={{
                  required: "Role is required",
                }}
                render={({ field }) => (
                  <Popover open={roleListOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-[200px] justify-between"
                        onClick={() => setRoleListOpen((prev) => !prev)}
                      >
                        {field.value ? field.value : "Select role"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {roles.map((role) => (
                              <CommandItem
                                key={role}
                                value={role}
                                onSelect={() => {
                                    console.log("select")
                                  field.onChange(role);
                                  setRoleListOpen(false);
                                }}
                              >
                                {role}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.role && (
                <div className="text-red-600">{errors.role.message}</div>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Login..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
