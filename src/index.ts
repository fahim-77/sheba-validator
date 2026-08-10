import { BANKS_DATA, getBankInfoByCode, type BankInfo, type BankInfoOptions } from "./bank";

export interface GetAllBanksOptions extends BankInfoOptions {
  includeMerged?: boolean;
  includeCentralBank?: boolean;
}

export type ShebaErrorCode = "EMPTY_INPUT" | "INVALID_LENGTH" | "INVALID_PREFIX" | "INVALID_CHECKSUM" | "UNKNOWN_BANK";

export interface ShebaValidationResult {
  isValid: boolean;
  errorCode?: ShebaErrorCode;
  errorMessage?: string;
  bank: BankInfo | null;
  formatted: string;
}

function sanitizeSheba(str: unknown): string {
  if (!str || typeof str !== "string") return "";

  return str
    .replace(/[۰-۹]/g, (d) => (d.charCodeAt(0) - 1776).toString())
    .replace(/[٠-٩]/g, (d) => (d.charCodeAt(0) - 1632).toString())
    .trim()
    .toUpperCase()
    .replace(/[\s-]/g, "");
}

function iso7064Mod97(iban: string): number {
  let remainder = iban;
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9);
    remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(9);
  }
  return parseInt(remainder, 10) % 97;
}

export function isShebaValid(sheba: string): boolean {
  const sanitized = sanitizeSheba(sheba);

  if (!/^IR\d{24}$/.test(sanitized)) {
    return false;
  }

  const rearranged = sanitized.slice(4) + sanitized.slice(0, 4);
  const numericString = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());

  return iso7064Mod97(numericString) === 1;
}

export function getBankInfo(sheba: string, options: BankInfoOptions = {}): BankInfo | null {
  const clean = sanitizeSheba(sheba);
  if (clean.length < 7) return null;

  const bankCode = clean.substring(4, 7);
  return getBankInfoByCode(bankCode, options);
}

export function beautifySheba(sheba: string): string {
  const clean = sanitizeSheba(sheba);
  if (!clean) return "";
  return clean.replace(/(.{4})/g, "$1 ").trim();
}

export function getAllBanks(options: GetAllBanksOptions = {}): BankInfo[] {
  const { includeMerged = false, includeLogo = false, includeCentralBank = false } = options;

  return Object.keys(BANKS_DATA)
    .filter((code) => {
      if (!includeCentralBank && code === "010") return false;
      if (!includeMerged && BANKS_DATA[code]?.isMerged) return false;
      return true;
    })
    .map((code) => getBankInfoByCode(code, { includeLogo }))
    .filter((bank): bank is BankInfo => bank !== null);
}

export function validateSheba(sheba: string, options: BankInfoOptions = {}): ShebaValidationResult {
  const clean = sanitizeSheba(sheba);

  if (!clean) {
    return {
      isValid: false,
      errorCode: "EMPTY_INPUT",
      errorMessage: "Sheba string is empty",
      bank: null,
      formatted: "",
    };
  }

  if (!clean.startsWith("IR")) {
    return {
      isValid: false,
      errorCode: "INVALID_PREFIX",
      errorMessage: "Sheba must start with 'IR'",
      bank: null,
      formatted: clean,
    };
  }

  if (clean.length !== 26) {
    return {
      isValid: false,
      errorCode: "INVALID_LENGTH",
      errorMessage: "Sheba must be exactly 26 characters long",
      bank: null,
      formatted: clean,
    };
  }

  if (!isShebaValid(clean)) {
    return {
      isValid: false,
      errorCode: "INVALID_CHECKSUM",
      errorMessage: "Invalid IBAN checksum",
      bank: null,
      formatted: beautifySheba(clean),
    };
  }

  const bank = getBankInfo(clean, options);

  if (!bank) {
    return {
      isValid: false,
      errorCode: "UNKNOWN_BANK",
      errorMessage: "Unknown bank code",
      bank: null,
      formatted: beautifySheba(clean),
    };
  }

  return {
    isValid: true,
    bank,
    formatted: beautifySheba(clean),
  };
}

export { getBankInfoByCode };
export type { BankInfo, BankInfoOptions };
