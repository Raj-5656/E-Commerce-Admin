import React from 'react'
import type { CommonFormProps, FieldConfig } from '../../types/CommomType'
import { useForm } from 'react-hook-form'

const CommonForm = <T,>({ form }: CommonFormProps<T>) => {
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    }=useForm<T>({defaultValues:form.defaultValues})

    const onSubmit =  (data : T) => {
        console.log(data);
    }

    const renderField = (fields : FieldConfig) => {
        const {name, label, type, required, placeholder} = fields;
    }
  return (
    <div>CommonForm</div>
  )
}

export default CommonForm