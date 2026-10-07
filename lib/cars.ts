export type Badge = "Just Arrived" | "Featured" | "Consignment";
export type BodyStyle = "Coupe" | "Roadster" | "Convertible" | "Fastback" | "Sedan";
export type Condition = "Restored" | "Daily Driver" | "Showroom" | "Project";
export type Location = "London" | "New York" | "Tokyo";

export interface Car {
  id: string;
  year: number;
  make: string;
  title: string;
  body: BodyStyle;
  price: number;
  badge: Badge;
  engine: string;
  transmission: string;
  mileage: number;
  colour: string;
  condition: Condition;
  location: Location;
  image: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`;

// Fallback photo per marque for cars without their own photoId.
const imageByMake: Record<string, string> = {
  Chevrolet: unsplash("1760044266098-6a40cadff83e"),
  Jaguar: unsplash("1742412615479-8173c0189475"),
  Porsche: unsplash("1772308886547-037a00d7d82f"),
  Shelby: unsplash("1641430589592-71899ccfb388"),
  "Mercedes-Benz": unsplash("1546863233-27386ee5bdf9"),
  Ferrari: unsplash("1528561404880-67a16c7f9860"),
};

function car(
  year: number,
  make: string,
  model: string,
  body: BodyStyle,
  price: number,
  engine: string,
  transmission: string,
  mileage: number,
  colour: string,
  badge: Badge,
  condition: Condition,
  location: Location,
  photoId?: string,
): Car {
  const title = `${year} ${make} ${model}`;
  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    year,
    make,
    title,
    body,
    price,
    badge,
    engine,
    transmission,
    mileage,
    colour,
    condition,
    location,
    image: photoId ? unsplash(photoId) : imageByMake[make],
  };
}

export const cars: Car[] = [
  car(1967, "Chevrolet", "Corvette Stingray L71 427", "Coupe", 185_000, "427 cu in V8", "4-speed manual", 48_200, "Marlboro Maroon", "Just Arrived", "Restored", "New York"),
  car(1963, "Jaguar", "E-Type Series 1 Roadster", "Roadster", 143_000, "3.8L XK inline-6", "4-speed manual", 61_500, "British Racing Green", "Featured", "Showroom", "London"),
  car(1974, "Porsche", "911 Carrera 2.7 RS", "Coupe", 330_000, "2.7L flat-6", "5-speed manual", 72_900, "Grand Prix White", "Featured", "Showroom", "Tokyo"),
  car(1965, "Shelby", "GT350 Fastback", "Fastback", 410_000, "289 cu in V8", "4-speed manual", 33_100, "Wimbledon White", "Consignment", "Restored", "New York"),
  car(1958, "Mercedes-Benz", "300SL Roadster", "Roadster", 1_250_000, "3.0L M198 inline-6", "4-speed manual", 29_800, "Silver Metallic", "Consignment", "Showroom", "London"),
  car(1974, "Ferrari", "365 GTB/4 Daytona", "Coupe", 668_000, "4.4L V12", "5-speed manual", 39_400, "Rosso Corsa", "Just Arrived", "Showroom", "Tokyo"),
  car(1969, "Chevrolet", "Camaro Z/28", "Coupe", 98_000, "302 cu in V8", "4-speed manual", 54_300, "Hugger Orange", "Just Arrived", "Daily Driver", "New York"),
  car(1971, "Jaguar", "E-Type Series 3 V12", "Convertible", 112_000, "5.3L V12", "4-speed manual", 44_800, "Sapphire Blue", "Featured", "Restored", "London"),
  car(1965, "Porsche", "356 SC Coupe", "Coupe", 142_000, "1.6L flat-4", "4-speed manual", 68_000, "Ivory", "Consignment", "Restored", "Tokyo"),
  car(1962, "Mercedes-Benz", "190SL Roadster", "Roadster", 165_000, "1.9L inline-4", "4-speed manual", 51_200, "Anthracite Grey", "Just Arrived", "Daily Driver", "London"),
  car(1966, "Ferrari", "275 GTB", "Coupe", 2_450_000, "3.3L V12", "5-speed manual", 36_700, "Argento Auteuil", "Consignment", "Showroom", "Tokyo"),
  car(1968, "Shelby", "GT500 KR Convertible", "Convertible", 285_000, "428 cu in Cobra Jet V8", "4-speed manual", 27_900, "Highland Green", "Featured", "Restored", "New York"),
  car(1970, "Chevrolet", "Chevelle SS 454", "Coupe", 89_000, "454 cu in V8", "4-speed manual", 61_000, "Cranberry Red", "Just Arrived", "Project", "New York"),
  car(1957, "Chevrolet", "Bel Air Convertible", "Convertible", 118_000, "283 cu in V8", "2-speed automatic", 42_000, "Tropical Turquoise", "Featured", "Restored", "New York"),
  car(1977, "Porsche", "911 Turbo 3.0", "Coupe", 195_000, "3.0L turbo flat-6", "4-speed manual", 38_100, "Guards Red", "Featured", "Daily Driver", "Tokyo"),
  car(1959, "Jaguar", "XK150 S Roadster", "Roadster", 175_000, "3.4L XK inline-6", "4-speed manual", 57_400, "Cotswold Blue", "Consignment", "Project", "London"),
  car(1972, "Ferrari", "365 GTC/4", "Coupe", 310_000, "4.4L V12", "5-speed manual", 47_600, "Blu Dino", "Just Arrived", "Restored", "London"),
  car(1955, "Mercedes-Benz", "300SL Gullwing", "Coupe", 1_650_000, "3.0L M198 inline-6", "4-speed manual", 33_000, "Silver Metallic", "Consignment", "Showroom", "Tokyo"),
  car(1965, "Shelby", "Cobra 289", "Roadster", 1_100_000, "289 cu in V8", "4-speed manual", 21_000, "Guardsman Blue", "Featured", "Showroom", "New York"),
  car(1969, "Chevrolet", "Corvette Stingray 427", "Convertible", 215_000, "427 cu in V8", "4-speed manual", 35_600, "Monaco Orange", "Just Arrived", "Daily Driver", "London"),
  car(1967, "Porsche", "911 S", "Coupe", 245_000, "2.0L flat-6", "5-speed manual", 66_800, "Irish Green", "Consignment", "Restored", "Tokyo"),
  car(1961, "Jaguar", "E-Type Series 1 3.8 Coupe", "Coupe", 205_000, "3.8L XK inline-6", "4-speed manual", 59_000, "Opalescent Silver Blue", "Featured", "Project", "London"),
  car(1975, "Ferrari", "308 GT4", "Coupe", 98_000, "3.0L V8", "5-speed manual", 44_300, "Giallo Modena", "Just Arrived", "Daily Driver", "Tokyo"),
  car(1970, "Mercedes-Benz", "280SL Pagoda", "Convertible", 138_000, "2.8L inline-6", "4-speed automatic", 72_500, "Signal Red", "Consignment", "Restored", "London"),
  car(1964, "Aston Martin", "DB5", "Coupe", 1_150_000, "4.0L inline-6", "5-speed manual", 41_300, "Silver Birch", "Consignment", "Showroom", "London", "1772550324665-3dd5ee2e40d2"),
  car(1967, "Alfa Romeo", "Spider Duetto", "Roadster", 68_000, "1.6L twin-cam inline-4", "5-speed manual", 58_900, "Rosso Alfa", "Just Arrived", "Restored", "Tokyo", "1741490346862-6e250fc4e4bc"),
  car(1962, "Austin-Healey", "3000 Mk II", "Roadster", 84_000, "2.9L inline-6", "4-speed manual with overdrive", 46_700, "Healey Blue", "Featured", "Restored", "London", "1747588468656-60fbc8b92bf7"),
  car(1959, "Austin-Healey", "Sprite", "Roadster", 26_500, "948cc inline-4", "4-speed manual", 63_400, "Iris Blue", "Just Arrived", "Project", "London", "1624002900892-b683122e3763"),
  car(1971, "Datsun", "240Z", "Coupe", 59_000, "2.4L inline-6", "4-speed manual", 71_200, "Sunshine Yellow", "Featured", "Daily Driver", "Tokyo", "1553971908-52975e6103c7"),
  car(1973, "BMW", "2002 tii", "Sedan", 47_500, "2.0L fuel-injected inline-4", "4-speed manual", 88_600, "Polaris Silver", "Just Arrived", "Daily Driver", "London", "1522932523034-a6af66247291"),
  car(1966, "Ford", "Mustang GT Fastback", "Fastback", 74_000, "289 cu in V8", "4-speed manual", 52_800, "Candy Apple Red", "Featured", "Restored", "New York", "1622319544231-ce84790b689a"),
  car(1958, "Cadillac", "Eldorado Biarritz", "Convertible", 132_000, "365 cu in V8", "Hydra-Matic automatic", 39_500, "Dakota Blue", "Consignment", "Showroom", "New York", "1559222960-93ec7099c1ca"),
  car(1972, "Porsche", "911 T Rally", "Coupe", 189_000, "2.4L flat-6", "5-speed manual", 94_100, "Light Ivory", "Consignment", "Restored", "Tokyo", "1741085119770-76054898ead2"),
  car(1969, "Jaguar", "E-Type Series 2 Roadster", "Roadster", 128_000, "4.2L XK inline-6", "4-speed manual", 53_800, "Old English White", "Featured", "Daily Driver", "London", "1750256603002-21792292d4a4"),
  car(1968, "Mercedes-Benz", "280 SE", "Sedan", 52_000, "2.8L inline-6", "4-speed automatic", 77_400, "Cream White", "Just Arrived", "Showroom", "Tokyo", "1775664352285-321b99a86ab8"),
  car(1965, "Chevrolet", "Corvette Sting Ray 327", "Coupe", 124_000, "327 cu in V8", "4-speed manual", 57_300, "Tuxedo Black", "Consignment", "Restored", "New York", "1564023572152-dd6dec058ebc"),
];

export const featuredCars = cars.slice(0, 12);

export const makes = Array.from(new Set(cars.map((c) => c.make))).sort();
export const bodyStyles: BodyStyle[] = ["Coupe", "Roadster", "Convertible", "Fastback", "Sedan"];
export const conditions: Condition[] = ["Restored", "Daily Driver", "Showroom", "Project"];
export const locations: Location[] = ["London", "New York", "Tokyo"];

export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;
export const formatMileage = (n: number) => `${n.toLocaleString("en-US")} mi`;
export const ctaFor = (c: Car) => (c.price >= 400_000 ? "Inquire" : "View Details");
