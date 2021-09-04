import * as React from "react";
import {ChangeEvent} from "react";


interface InputProps {
    id: string;
    type: "email" | "text" | "password"
    label: string;
    value: string;
    valid: boolean,
    validationStarted: boolean,
    required: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    invalidValueMessage:string;
    enabled?:boolean;
}

export function Input(inputProps: InputProps) {
    return (
        <div className="form-item">
            <label
                htmlFor={inputProps.id}
                className="grey-text font-weight-light"
            >
                {inputProps.label}
            </label>
            <input
                type={inputProps.type}
                id={inputProps.id}
                className={getFormControlClass(inputProps.validationStarted, inputProps.valid)}
                disabled={typeof  inputProps.enabled === 'undefined' ? false : !inputProps.enabled}
                value={inputProps.value} onChange={inputProps.onChange} required={inputProps.required}
            />
            {inputProps.validationStarted && !inputProps.valid ?
                <div className="text-left invalid-feedback visible">
                    {inputProps.invalidValueMessage}
                </div> : <></>}
        </div>
    )
}

export function getFormControlClass(validationStarted: boolean, valid: boolean): string {
    return !validationStarted ? 'form-control' : valid ? "form-control is-valid" : "form-control is-invalid";
}
