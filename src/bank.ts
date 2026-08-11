import { bankLogos } from "./bankLogos";

export interface BankInfo {
  code: string;
  name: string;
  displayName?: string;
  logo: string;
  slug: string;
  isMerged: boolean;
  mergedInto?: string;
}

export interface BankInfoOptions {
  includeLogo?: boolean;
}

export const BANKS_DATA: Record<string, { name: string; slug: string; isMerged?: boolean; mergedInto?: string }> = {
  "012": { name: "بانک ملت", slug: "mellat" },
  "018": { name: "بانک تجارت", slug: "tejarat" },
  "019": { name: "بانک صادرات", slug: "saderat" },
  "017": { name: "بانک ملّی ایران", slug: "melli" },
  "061": { name: "بانک شهر", slug: "shahr" },
  "070": { name: "بانک قرض‌الحسنه رسالت", slug: "resalat" },
  "014": { name: "بانک مسکن", slug: "maskan" },
  "057": { name: "بانک پاسارگاد", slug: "pasargad" },
  "016": { name: "بانک کشاورزی", slug: "keshavarzi" },
  "015": { name: "بانک سپه", slug: "sepah" },
  "062": { name: "بانک آینده", slug: "ayandeh", isMerged: true, mergedInto: "بانک ملی ایران" },
  "056": { name: "بانک سامان", slug: "saman" },
  "055": { name: "بانک اقتصاد نوین", slug: "eghtesad-novin" },
  "064": { name: "بانک گردشگری", slug: "gardeshgari" },
  "022": { name: "بانک توسعه تعاون", slug: "toose-taavon" },
  "066": { name: "بانک دی", slug: "dey" },
  "059": { name: "بانک سینا", slug: "sina" },
  "069": { name: "بانک ایران زمین", slug: "iran-zamin" },
  "011": { name: "بانک صنعت و معدن", slug: "sanat-o-madan" },
  "020": { name: "بانک توسعه صادرات ایران", slug: "tosee-saderat" },
  "053": { name: "بانک کارآفرین", slug: "karafarin" },
  "058": { name: "بانک سرمایه", slug: "sarmayeh" },
  "021": { name: "پست بانک ایران", slug: "post" },
  "075": { name: "موسسه اعتباری ملل", slug: "melal" },
  "060": { name: "بانک قرض‌الحسنه مهر ایران", slug: "mehr-iran" },
  "054": { name: "بانک پارسیان", slug: "parsian" },
  "052": { name: "بانک قوامین", slug: "ghavamin", isMerged: true, mergedInto: "بانک سپه" },
  "063": { name: "بانک انصار", slug: "ansar", isMerged: true, mergedInto: "بانک سپه" },
  "065": { name: "بانک حکمت ایرانیان", slug: "hekmat-iranian", isMerged: true, mergedInto: "بانک سپه" },
  "079": { name: "بانک مهر اقتصاد", slug: "mehr-eqtesad", isMerged: true, mergedInto: "بانک سپه" },
  "073": { name: "موسسه اعتباری کوثر", slug: "kosar", isMerged: true, mergedInto: "بانک سپه" },
  "095": { name: "بانک مشترک ایران-ونزوئلا", slug: "iran-venezuela" },
  "078": { name: "بانک خاورمیانه", slug: "middle-east-bank" },
  "013": { name: "بانک رفاه", slug: "refah" },
  "010": { name: "بانک مرکزی جمهوری اسلامی ایران", slug: "central-bank" },
};

export function getBankInfoByCode(code: string, options: BankInfoOptions = {}): BankInfo | null {
  const { includeLogo = true } = options;
  const bank = BANKS_DATA[code];
  if (!bank) return null;

  const result: BankInfo = {
    code,
    name: bank.name,
    slug: bank.slug,
    displayName: bank.isMerged ? `${bank.name} (ادغام شده در ${bank.mergedInto})` : bank.name,
    logo: includeLogo ? bankLogos[code] || "" : "",
    isMerged: bank.isMerged || false,
  };

  if (bank.mergedInto) {
    result.mergedInto = bank.mergedInto;
  }

  return result;
}
