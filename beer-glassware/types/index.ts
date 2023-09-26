import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    value?: boolean;
}

export interface SearchBeerProps {
    beer: string;
    setBeer: (beer: string) => void;
  }