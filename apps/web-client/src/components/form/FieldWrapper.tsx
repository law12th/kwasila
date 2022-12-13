import clsx from "clsx";
import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
	label?: string;
	error?: FieldError | undefined;
	children: React.ReactNode;
	className?: string;
	description?: string;
};

export type FieldWrapperPassThroughProps = Omit<
	FieldWrapperProps,
	"className" | "children"
>;

export const FieldWrapper = ({
	label,
	error,
	children,
	className,
}: FieldWrapperProps) => (
	<div>
		<label
			className={clsx("block text-sm font-medium text-gray-700", className)}
		>
			{label}
			<div className="mt-1">{children}</div>
		</label>
		{error?.message && (
			<div
				role="alert"
				aria-label={error.message}
				className="text-sm font-semibold text-red-500"
			>
				{error.message}
			</div>
		)}
	</div>
);
