import { bankLogos } from "./bankLogos";

export interface BankInfo {
  code: string;
  name: string;
  displayName?: string;
  logo: string;
  isMerged: boolean;
  mergedInto?: string;
}

export interface BankInfoOptions {
  includeLogo?: boolean;
}

export const BANKS_DATA: Record<string, { name: string; isMerged?: boolean; mergedInto?: string }> = {
  "012": { name: "بانک ملت" },
  "018": { name: "بانک تجارت" },
  "019": { name: "بانک صادرات" },
  "017": { name: "بانک ملّی ایران" },
  "061": { name: "بانک شهر" },
  "070": { name: "بانک قرض‌الحسنه رسالت" },
  "014": { name: "بانک مسکن" },
  "057": { name: "بانک پاسارگاد" },
  "016": { name: "بانک کشاورزی" },
  "015": { name: "بانک سپه" },
  "062": { name: "بانک آینده", isMerged: true, mergedInto: "بانک ملی ایران" },
  "056": { name: "بانک سامان" },
  "055": { name: "بانک اقتصاد نوین" },
  "064": { name: "بانک گردشگری" },
  "022": { name: "بانک توسعه تعاون" },
  "066": { name: "بانک دی" },
  "059": { name: "بانک سینا" },
  "069": { name: "بانک ایران زمین" },
  "011": { name: "بانک صنعت و معدن" },
  "020": { name: "بانک توسعه صادرات ایران" },
  "053": { name: "بانک کارآفرین" },
  "058": { name: "بانک سرمایه" },
  "021": { name: "پست بانک ایران" },
  "075": { name: "موسسه اعتباری ملل" },
  "060": { name: "بانک قرض‌الحسنه مهر ایران" },
  "054": { name: "بانک پارسیان" },
  "052": { name: "بانک قوامین", isMerged: true, mergedInto: "بانک سپه" },
  "063": { name: "بانک انصار", isMerged: true, mergedInto: "بانک سپه" },
  "065": { name: "بانک حکمت ایرانیان", isMerged: true, mergedInto: "بانک سپه" },
  "079": { name: "بانک مهر اقتصاد", isMerged: true, mergedInto: "بانک سپه" },
  "073": { name: "موسسه اعتباری کوثر", isMerged: true, mergedInto: "بانک سپه" },
  "095": { name: "بانک مشترک ایران-ونزوئلا" },
  "078": { name: "بانک خاورمیانه" },
  "013": { name: "بانک رفاه" },
  "010": { name: "بانک مرکزی جمهوری اسلامی ایران" },
};

export function getBankInfoByCode(code: string, options: BankInfoOptions = {}): BankInfo | null {
  const { includeLogo = true } = options;
  const bank = BANKS_DATA[code];
  if (!bank) return null;

  const result: BankInfo = {
    code,
    name: bank.name,
    displayName: bank.isMerged ? `${bank.name} (ادغام شده در ${bank.mergedInto})` : bank.name,
    logo: includeLogo ? bankLogos[code] || "" : "",
    isMerged: bank.isMerged || false,
  };

  if (bank.mergedInto) {
    result.mergedInto = bank.mergedInto;
  }

  return result;
}
