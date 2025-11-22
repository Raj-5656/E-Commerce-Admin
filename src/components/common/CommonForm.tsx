import React, { useEffect, useState } from 'react'
import type { CommonFormProps, FieldConfig } from '../../types/CommomType'
import { useForm, type Path, type SubmitHandler } from 'react-hook-form'
import CategoryApi from '../../api/CategoryApi';
import toast from 'react-hot-toast';

const CommonForm = <T extends Record<string, any>>({ form }: CommonFormProps<T>) => {

    const [dynamicOptions, setDynamicOptions] = useState<Record<string, any[]>>({});
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<any>({
        defaultValues: form.defaultValues,
    });

    const onSubmit: SubmitHandler<T> = async (data) => {
        try {
            const result = await form.submitApi(data);
            toast.success('Form submitted successfully!');
            reset();

        } catch (err: any) {
            // Error toast
            toast.error(err.message || 'Failed to submit form');
        }
    };


    useEffect(() => {
        loadOptions();
    }, [form.fields])

    const loadOptions = async () => {
        setIsLoadingOptions(true);
        try {
            for (const field of form.fields) {
                if (field.type === "select" && field.fetchOptions) {
                    const result = await field.fetchOptions();
                    const formatted = result.map((item: any) => ({
                        label: item.name,
                        value: item._id,
                    }));
                    
                    setDynamicOptions(prev => ({
                        ...prev,
                        [field.name]: formatted
                    }));
                }
            }
        } catch (error) {
            toast.error('Failed to load form options');
        } finally {
            setIsLoadingOptions(false);
        }
    };
    const renderField = (field: FieldConfig) => {
        const { name, label, type, required, placeholder, options } = field;

        const fieldRegister = register(name as Path<T>, { required });

        const finalOptions = dynamicOptions[name] || options || [];

        switch (type) {
            case "select":
                return (
                    <select
                        {...fieldRegister}
                        className=" border border-gray-300  p-2.5  rounded-lg  w-full  text-sm  focus:ring-2  focus:ring-blue-500  focus:border-blue-500 outline-none  transition-all"
                    >
                        <option value="">Select {label}</option>
                        {isLoadingOptions ? (
                            <option>Loading...</option>
                        ) : (
                            finalOptions?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))
                        )}


                    </select>
                );
            default:
                return (
                    <input
                        type={type}
                        placeholder={placeholder}
                        {...fieldRegister}
                        className="border border-gray-300  p-2.5  rounded-lg  w-full text-sm focus:ring-2  focus:ring-blue-500  focus:border-blue-500 outline-none  transition-all"
                    />
                );

        }
    };


    return (
        <form
            className="space-y-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Form Fields */}
            {form.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {renderField(field)}

                    {errors[field.name as keyof T] && (
                        <p className="text-red-500 text-xs mt-1">{field.label} is required</p>
                    )}
                </div>
            ))}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className=" w-full  py-2.5  rounded-xl  bg-blue-600  text-white font-medium  shadow-sm  hover:bg-blue-700  transition-all  duration-200 disabled:opacity-50 disabled:cursor-not-allowed "
            >
                {isSubmitting ? "Saving..." : "Submit"}
            </button>
        </form>
    );

}

export default CommonForm