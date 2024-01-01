import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import '../styles/LoadForm.css'

type FormData = {
  driverName: string
  loadWeight: string
  email: string
  phoneNumber: string
  origin: string
  // destinations: { destination: string }[]
  destination: string
}
export default function LoadForm() {
  const form = useForm<FormData>({
    defaultValues: {
      driverName: "",
      loadWeight: "",
      email: "",
      phoneNumber: "",
      origin: "",
      // destinations: [{ destination: "" }],
      destination: ""
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  // const { fields, append, remove } = useFieldArray({
  //   name: "destinations",
  //   control
  // })
  
  const onSubmit = (data: FormData) => {
    console.log("submitted", data)
    const formElement = document.getElementById("form") as HTMLFormElement;;
    if (formElement) {
      formElement.reset();
    }
  }

  return (
    <>
      <form id="form" onSubmit={handleSubmit(onSubmit)} noValidate>

        <label htmlFor="driverName">Name</label>
        <input type="text" id="driverName" {...register('driverName', { required: "*Driver's name is required" })} />
        <p><sup>{errors.driverName?.message}</sup></p>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register('email', { required: "*Email is required" })} />
        <p><sup>{errors.email?.message}</sup></p>

        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" {...register('phoneNumber', { required: "*Phone number is required" })} />
        <p><sup>{errors.phoneNumber?.message}</sup></p>

        <label htmlFor="loadWeight">Load Weight</label>
        <input type="number" id="loadWeight" {...register('loadWeight', { required: "*Load weight is required" })} />
        <p><sup>{errors.loadWeight?.message}</sup></p>

        <label htmlFor="origin">Origin</label>
        <input type="text" id="origin" {...register('origin', { required: "*Origin is required" })} />
        <p><sup>{errors.origin?.message}</sup></p>

        {/* <div>
          <label htmlFor="destination">Destination(s)</label>
          <div id="destinationsList">
            {fields.map((field, index) => (
              <div className="destination" key={field.id}>
                <input type="text" {...register(`destinations.${index}.destination`)} />
                {index > 0 && <button type="button" onClick={() => remove(index)}>Remove Destination</button>}
              </div>
            ))}
            <p><sup>{errors.destinations?.message}</sup></p>
            <button type="button" onClick={() => append({ destination: "" })}>Add Destination</button>
          </div>
        </div> */}

        <label htmlFor="destination">Destination(s)</label>
        <input type="text" id="destination" {...register('destination', { required: "*Destination is required" })} />
        <p><sup>{errors.destination?.message}</sup></p>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </>
  )
}