const brand = [
  { name: "Xpert", value: "xpert" },
  { name: "Ugreen", value: "ugreen" },
  { name: "Joyroom", value: "joyroom" },
  { name: "Xiaomi", value: "xiaomi" },
  { name: "Mcdodo", value: "mcdodo" },
  { name: "Awei", value: "awei" },
  { name: "Wiwu", value: "wiwu" },
  { name: "Remax", value: "remax" }
];

const processor_type = [
  { name: "Intel", value: "INTEL" },
  { name: "AMD", value: "AMD" },
  { name: "Apple", value: "APPLE" },
];

export const productManager = {
  brand,
  processor_type,
};

export   const calculateTimeLeft = (start: Date, end: Date) => {
  const now = new Date();
  const difference = start.getTime() > now.getTime() 
    ? start.getTime() - now.getTime() 
    : end.getTime() - now.getTime();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};


export function setCookie(name:string, value:any, minutes:number) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000); 
  document.cookie = `${name}=${JSON.stringify(value)}; expires=${date.toUTCString()}; path=/`;
}

export function getCookie(name:string) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      try {
        return JSON.parse(decodeURIComponent(value)); 
      } catch (e) {
        return decodeURIComponent(value);
      }
    }
  }
  return null;
}