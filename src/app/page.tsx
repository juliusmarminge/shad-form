"use client";

import { useState } from "react";
import { z } from "zod";

import { Input } from "~/ui/input";
import { Button } from "~/ui/button";
import { Label } from "~/ui/label";
import { Textarea } from "~/ui/text-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { useZodForm } from "~/utils/zod-form";
import { Controller } from "react-hook-form";

const countries = {
  US: "US",
  UK: "UK",
  SE: "SE",
} as const;

const steps = {
  1: z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
  }),
  2: z.object({
    country: z.nativeEnum(countries),
    postalCode: z.string().min(3).max(20),
  }),
  3: z.object({
    text: z.string(),
  }),
};
type FormData = z.infer<typeof steps[keyof typeof steps]>;

export default function Multistep() {
  const [step, setStep] = useState(1);
  const [composedData, setComposedData] = useState<FormData>();

  return (
    <div className="max-w-2xl py-16 mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Multistep form</h1>
      <div className="space-y-8">
        {step === 1 && (
          <Step1
            onStepDone={(data) => {
              setStep(2);
              setComposedData((prev) => ({ ...prev, ...data }));
            }}
          />
        )}
        {step === 2 && (
          <Step2
            onStepDone={(data) => {
              setStep(3);
              setComposedData((prev) => ({ ...prev, ...data }));
            }}
          />
        )}
        {step === 3 && (
          <Step3
            onStepDone={(data) => {
              setStep(4);
              setComposedData((prev) => ({ ...prev, ...data }));
            }}
          />
        )}
        {step === 4 && (
          <Result
            data={composedData}
            restart={() => {
              setStep(1);
              setComposedData(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

function Step1(props: {
  onStepDone: (data: z.infer<typeof steps[1]>) => void;
}) {
  const methods = useZodForm({
    schema: steps[1],
  });

  return (
    <div className="space-y-2">
      <form
        className="space-y-4"
        onSubmit={methods.handleSubmit((data) => {
          console.log("Step 1", data);
          props.onStepDone(data);
        })}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Name"
            {...methods.register("name")}
            className="w-full"
          />
          <p className="text-red-500 font-medium">
            {methods.formState.errors?.name?.message}
          </p>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            {...methods.register("email")}
            className="w-full"
          />
          <p className="text-red-500 font-medium">
            {methods.formState.errors?.email?.message}
          </p>
        </div>

        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function Step2(props: {
  onStepDone: (data: z.infer<typeof steps[2]>) => void;
}) {
  const methods = useZodForm({
    schema: steps[2],
  });

  return (
    <div className="space-y-1">
      <form
        className="space-y-4"
        onSubmit={methods.handleSubmit((data) => {
          console.log("Step 2", data);
          props.onStepDone(data);
        })}
      >
        <div>
          <Label htmlFor="country">Country</Label>
          <Controller
            control={methods.control}
            name="country"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Where are you from?" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(countries).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <p className="text-red-500 font-medium">
            {methods.formState.errors?.country?.message}
          </p>
        </div>

        <div>
          <Label htmlFor="postalCode">Postal code</Label>
          <Input
            id="postalCode"
            placeholder="Postal code"
            {...methods.register("postalCode")}
            className="w-full"
          />
          <p className="text-red-500 font-medium">
            {methods.formState.errors?.postalCode?.message}
          </p>
        </div>

        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function Step3(props: {
  onStepDone: (data: z.infer<typeof steps[3]>) => void;
}) {
  const methods = useZodForm({
    schema: steps[3],
  });

  return (
    <div className="space-y-1">
      <form
        className="space-y-4"
        onSubmit={methods.handleSubmit((data) => {
          console.log("Step 3", data);
          props.onStepDone(data);
        })}
      >
        <div>
          <Label htmlFor="text">Additional information</Label>
          <Textarea
            id="text"
            placeholder="Text"
            {...methods.register("text")}
            className="w-full"
          />
          <p className="text-red-500 font-medium">
            {methods.formState.errors?.text?.message}
          </p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

function Result(props: { data?: FormData; restart: () => void }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-bold">Result</h2>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
      <Button onClick={() => props.restart()}>Restart</Button>
    </div>
  );
}
