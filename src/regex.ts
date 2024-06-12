export const Regex = (text: string) => {
  // Khusus untuk pencairan yang lebih kompleks sehingga tidak bisa menggunakan string matching algorithm
  const regex =
    new Regex(`(?i)(\bFREE\b|\bWIN\b|\bCLICK\b|\bHERE\b|\bLIMITED\b|\bOFFER\b|\bBUY\b|\bNOW\b|\bMONEY\b|\bCASH\b|\bDISCOUNT\b|\bSALE\b)|
((http|https):\/\/)?(www\.)?([a-zA-Z0-9]+)(\.([a-zA-Z]{2,}))+|
\b([A-Z]{3,})\b|
(.)\1{2,}
`);

    return 
};
