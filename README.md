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