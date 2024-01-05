import React, { useContext, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { SubmissionContext } from '../context/SubmissionContext'
import '../styles/LoadForm.css'

type FormData = {
  name: string
  load_weight: string
  email: string
  phone_number: string
  origin: string
  destinations: { destination: string }[]
}
export default function LoadForm() {
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      load_weight: "",
      email: "",
      phone_number: "",
      origin: "",
      destinations: [{ destination: "" }],
    },
  });

  const { setSubmissionValue } = useContext(SubmissionContext);
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "destinations",
    control
  })

  const onSubmit = (data: FormData) => {
    fetch("http://localhost:8000/shipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => console.log("Submitted", data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (isSubmitSuccessful && setSubmissionValue) {
      setSubmissionValue(true);
      reset();
    }
  }, [isSubmitSuccessful, setSubmissionValue, reset]);

  return (
    <>
      <form id="form" onSubmit={handleSubmit(onSubmit)} noValidate>

        <label htmlFor="name">Drivers's Name:</label>
        <input type="text" id="name" {...register('name', { required: "*Driver's name is required" })} />
        <p><sup>{errors.name?.message}</sup></p>

        <label htmlFor="email">Driver's Email: </label>
        <input type="text" id="email" {...register('email', { required: "*Email is required" })} />
        <p><sup>{errors.email?.message}</sup></p>

        <label htmlFor="phone_number">Driver's Phone Number: </label>
        <input type="text" id="phone_number" {...register('phone_number', { required: "*Phone number is required" })} />
        <p><sup>{errors.phone_number?.message}</sup></p>

        <label htmlFor="load_weight">Load Weight(lbs):</label>
        <input type="number" id="load_weight" {...register('load_weight', { required: "*Load weight is required" })} />
        <p><sup>{errors.load_weight?.message}</sup></p>

        <label htmlFor="origin">Load Origin: </label>
        <input type="text" id="origin" {...register('origin', { required: "*Origin is required" })} />
        <p><sup>{errors.origin?.message}</sup></p>

        <label htmlFor="destinations">Load Destination(s): </label>
        <div id="destinationsList">
          {fields.map((field, index) => (
            <div className="destination" key={field.id}>
              <input type="text" {...register(`destinations.${index}.destination`, { required: "*Destination is required" })} />
              {index > 0 && <button type="button" onClick={() => remove(index)}>Remove Destination</button>}
              <p><sup>{errors.destinations && errors.destinations[index]?.destination?.message}</sup></p>
            </div>
          ))}
          <button type="button" onClick={() => append({ destination: "" })}>Add Destination</button>
        </div>

        <button>Submit</button>

      </form>
      <DevTool control={control} />
    </>
  )
}