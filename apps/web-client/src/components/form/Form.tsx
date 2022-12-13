import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
	FieldValues,
	SubmitHandler,
	useForm,
	UseFormProps,
	UseFormReturn,
} from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";

type FormProps<TFormValues extends FieldValues, TSchema> = {
	className?: string;
	onSubmit: SubmitHandler<TFormValues>;
	children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
	options?: UseFormProps<TFormValues>;
	id?: string;
	schema?: TSchema;
};

const Form = <
	TFormValues extends Record<string, unknown> = Record<string, unknown>,
	TSchema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
		unknown,
		ZodTypeDef,
		unknown
	>
>({
	onSubmit,
	children,
	className,
	options,
	id,
	schema,
}: FormProps<TFormValues, TSchema>) => {
	const methods = useForm<TFormValues>({
		...options,
		resolver: schema && zodResolver(schema),
	});

	return (
		<form
			className={clsx("space-y-6", className)}
			onSubmit={methods.handleSubmit(onSubmit)}
			id={id}
		>
			{children(methods)}
		</form>
	);
};

export default Form;
