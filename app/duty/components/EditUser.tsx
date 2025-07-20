"use client";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import type { StylesConfig, GroupBase } from "react-select";

type User = {
  email: string;
  phone: number;
  dutyPlace: string;
  role: string;
};

type BranchDetails = {
  division: string;
  name: string;
  available: boolean;
  phone: string[];
  address: string;
};

type OptionType = {
  label: string;
  value: string;
};

const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: "#D5A5FD",
    boxShadow: state.isFocused ? "0 0 0 0.1px #D5A5FD" : "none",
    "&:hover": {
      borderColor: "#6b21a8",
    },
    borderRadius: "1rem",
    padding: "0.1rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#6b21a8"
      : state.isFocused
      ? "#ede9fe"
      : "white",
  }),
};

export default function EditUser({
  branchList,
  user,
}: {
  branchList: BranchDetails[];
  user: User;
}) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const placeOptions: OptionType[] = branchList.map((b) => ({
    value: `${b.name}, ${b.division}`,
    label: `${b.name}, ${b.division}`,
  }));

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: {
      email: user.email,
      phone: user.phone,
      dutyPlace: user.dutyPlace,
      role: user.role,
    },
  });

  const onSubmit = async (data: User) => {
    console.log("User created successfully");
    reset();
  };

  if (!mount) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-6 w-full md:w-11/12"
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
        <span className="flex flex-col w-full">
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Enter Email"
            className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
          />
          {errors.email && (
            <p className="text-pink-700 text-sm">{errors.email.message}</p>
          )}
        </span>

        <span className="flex flex-col w-full">
          <input
            {...register("phone", { required: "Phone is required" })}
            type="tel"
            placeholder="Enter Phone number"
            className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
          />
          {errors.phone && (
            <p className="text-pink-700 text-sm">{errors.phone.message}</p>
          )}
        </span>

        <Controller
          name="dutyPlace"
          control={control}
          rules={{ required: "Please select one place" }}
          render={({ field }) => {
            const selectedOption = placeOptions.find(
              (opt) => opt.value === field.value
            );
            return (
              <>
                <Select
                  options={placeOptions}
                  isClearable
                  placeholder="Select a place..."
                  className="w-full text-black"
                  styles={customStyles}
                  value={selectedOption || null}
                  onChange={(val) => field.onChange(val?.value || "")}
                />
                {selectedOption && (
                  <div className="text-sm sm:col-span-2 lg:col-span-1">
                    Duty Place - <strong>{selectedOption.label}</strong>
                  </div>
                )}
                {errors.dutyPlace && (
                  <p className="text-pink-700 text-sm">
                    {errors.dutyPlace.message}
                  </p>
                )}
              </>
            );
          }}
        />

        <span className="flex flex-col w-full">
          <label className="block mb-2 font-semibold">Select Role:</label>
          <div className="flex flex-wrap gap-6">
            {["manager", "admin", "editor", "employee"].map((role) => (
              <label key={role} className="cursor-pointer">
                <input
                  {...register("role", { required: true })}
                  type="radio"
                  value={role}
                  className="mr-2"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
          {errors.role && (
            <p className="text-pink-700 text-sm">{errors.role.message}</p>
          )}
        </span>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-purple-900 px-4 py-2 rounded-xl text-white font-bold hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300"
      >
        {isSubmitting ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
