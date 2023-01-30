"use client";

import { z } from "zod";
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/ui/input";
import { Button } from "~/ui/button";
import { Label } from "~/ui/label";

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

const schema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
});

export default function FormTest() {
  const methods = useZodForm({
    schema,
    defaultValues: {
      name: "",
      email: "",
    },
  });

  return (
    <div className="max-w-2xl py-16 mx-auto space-y-8">
      <form action="" className="flex flex-col gap-4 ">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="bg-slate-600/60"
            {...methods.register("name")}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="bg-slate-600/60"
            {...methods.register("email")}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>

      <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
    </div>
  );
}
