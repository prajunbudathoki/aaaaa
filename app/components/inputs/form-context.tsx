import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./text-field";
import { TextAreaField } from "./textarea-field";
import { Button } from "../ui/button";

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

function SubmitButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" onClick={()=> {
            form.handleSubmit()
        }} loading={isSubmitting}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextAreaField,
  },
  formComponents: {
    SubmitButton,
  },
});
