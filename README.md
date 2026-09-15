# Sheba Validator 🟢

A lightweight, zero-dependency TypeScript library for validating Iranian Sheba (IBAN) numbers, detecting bank details, handling merged banks, and offering embedded bank logos for UI components.

## Features ✨

- ⚡ **Zero Dependencies & Ultra Lightweight**
- 🏦 **Comprehensive Bank Support**: Covers all Iranian banks and credit institutions.
- 🔄 **Merged Banks Support**: Accurately maps merged banks (e.g., Ansar, Ghavamin, Mehr Eqtesad into Bank Sepah).
- 🎨 **Embedded Base64 Logos**: Optimized WebP base64 logos ready for direct UI rendering.
- 🔢 **Persian/Arabic Digit Sanitization**: Automatically normalizes digits and strips spaces or dashes.
- 🛡️ **ISO 7064 Mod 97-10 Compliant**: Strictly follows official IBAN checksum validation algorithms.
- 📦 **Modern Build Pipeline**: Full TypeScript support with both ESM and CJS outputs.

## Installation ⚙️

```bash
npm install sheba-validator
# or
yarn add sheba-validator
# or
pnpm add sheba-validator
```

## 📖 Usage Guide

```typescript
import { validateSheba, isShebaValid, getBankInfo, beautifySheba, getAllBanks, getBankBySlug, getBankInfoByCode } from "sheba-validator";

// 1. Comprehensive Validation (Recommended)
const result = validateSheba("IR000000000000000000000000");
/*
Output:
{
  isValid: true,
  formatted: "IR00 0000 0000 0000 0000 0000",
  bank: {
    code: "012",
    name: "بانک ملت",
    slug: "mellat",
    displayName: "بانک ملت",
    logo: "data:image/webp;base64,...",
    isMerged: false
  }
}
If invalid:
{
  isValid: false,
  errorCode: "INVALID_CHECKSUM", // "EMPTY_INPUT" | "INVALID_LENGTH" | "INVALID_PREFIX" | "UNKNOWN_BANK"
  errorMessage: "Invalid IBAN checksum",
  bank: null,
  formatted: "..."
}
*/

// 2. Quick Checksum Boolean Check
const isValid = isShebaValid("IR000000000000000000000000"); // true or false

// 3. Format & Beautify Sheba String
const formatted = beautifySheba("IR000000000000000000000000");
// Result: "IR00 0000 0000 0000 0000 0000"

// 4. Retrieve Bank Info Directly
const bankInfo = getBankInfo("IR012000000000000000000000", { includeLogo: true });

// 5. Query Bank by Slug or Bank Code
const mellat = getBankBySlug("mellat");
const melli = getBankInfoByCode("017");

// 6. Get List of All Supported Banks
const banksList = getAllBanks({
  includeMerged: false, // default: false
  includeCentralBank: false, // default: false
  includeLogo: false, // default: false
});
```
