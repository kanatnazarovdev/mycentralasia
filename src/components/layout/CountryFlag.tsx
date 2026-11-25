import React from "react";
import { CountryCode } from "@/data/centralAsiaData";

export default function CountryFlag({
  code,
  className = "h-3.5 w-5",
}: {
  code: CountryCode;
  className?: string;
}) {
  switch (code) {
    case "UZ":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="5" y="0" fill="#0099B5" />
          <rect width="24" height="0.6" y="5" fill="#CE1126" />
          <rect width="24" height="4.8" y="5.6" fill="#FFFFFF" />
          <rect width="24" height="0.6" y="10.4" fill="#CE1126" />
          <rect width="24" height="5" y="11" fill="#1EB53A" />
          <circle cx="4.5" cy="2.5" r="1.4" fill="#FFFFFF" />
          <circle cx="5.1" cy="2.5" r="1.15" fill="#0099B5" />
        </svg>
      );
    case "KZ":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="16" fill="#00AFCA" />
          <rect width="1.6" height="16" x="1.5" fill="#FEC50C" opacity="0.85" />
          <circle cx="12.5" cy="7.5" r="2.8" fill="#FEC50C" />
          <path d="M9.5 11.2 Q12.5 13 15.5 11.2" stroke="#FEC50C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "KG":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="16" fill="#E8112D" />
          <circle cx="12" cy="8" r="3.4" fill="#FFEF00" />
          <circle cx="12" cy="8" r="2.1" fill="#E8112D" />
          <path d="M10.4 6.8 Q12 8.2 13.6 6.8 M10.4 9.2 Q12 7.8 13.6 9.2" stroke="#FFEF00" strokeWidth="0.7" fill="none" />
        </svg>
      );
    case "TJ":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="4.6" y="0" fill="#CC0000" />
          <rect width="24" height="6.8" y="4.6" fill="#FFFFFF" />
          <rect width="24" height="4.6" y="11.4" fill="#006600" />
          <path d="M10.2 8.6 Q12 7.2 13.8 8.6" stroke="#F8C300" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="6.6" r="0.6" fill="#F8C300" />
        </svg>
      );
    case "TM":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="16" fill="#00843D" />
          <rect width="3.5" height="16" x="3.2" fill="#D22630" />
          <circle cx="10.5" cy="5.5" r="2" fill="#FFFFFF" />
          <circle cx="11.3" cy="5.1" r="1.7" fill="#00843D" />
        </svg>
      );
  }
}
