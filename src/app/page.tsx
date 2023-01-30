"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/ui/input";
import { Button } from "~/ui/button";
import { Label } from "~/ui/label";
import { Textarea } from "~/ui/text-area";

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

const PET = {
  DOG: "DOG",
  CAT: "CAT",
  IDK: "IDK",
} as const;

const schema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  text: z.string().min(50),
  pet: z.nativeEnum(PET),
});

export default function FormTest() {
  const methods = useZodForm({
    schema,
    defaultValues: {
      name: "",
      email: "",
      text: "",
      pet: "DOG",
    },
  });

  const [result, setResult] = useState({ name: "", email: "" });
  const onSubmit = methods.handleSubmit((data) => {
    setResult(data); // send to backend or smth
  });

  return (
    <div className="max-w-2xl py-16 mx-auto space-y-8">
      <form action="" className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="bg-slate-800"
            {...methods.register("name")}
          />
          <p className="text-red-500 font-medium">
            {methods.formState.errors?.name?.message}
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="bg-slate-800"
            {...methods.register("email")}
          />
          <p className="text-red-500 font-medium">
            {methods.formState.errors?.email?.message}
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="text">Text</Label>
          <Textarea
            id="text"
            className="bg-slate-800"
            {...methods.register("text")}
          />
          <p className="text-red-500 font-medium">
            {methods.formState.errors?.text?.message}
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="pet">Pet</Label>

          <p className="text-red-500 font-medium">
            {methods.formState.errors?.pet?.message}
          </p>
        </div>
        <Button type="submit">Submit</Button>
      </form>

      <pre>Watch: {JSON.stringify(methods.watch(), null, 2)}</pre>
      <pre>Result: {JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
