import { readFile, writeFile } from "node:fs/promises";

export async function ucitajZadatke() {
  try {
    const podaci = await readFile('zadaci.json', 'utf8');
    const zadaci = JSON.parse(podaci);

    if (!Array.isArray(zadaci)) {
      throw new Error("Sadržaj datoteke 'zadaci.json' mora biti polje.");
    }
    for (const z of zadaci) {
            if (
                !z ||
                !Number.isInteger(z.id) ||
                typeof z.naslov !== 'string' ||
                typeof z.gotovo !== 'boolean'
            ) {
                throw new Error("Neispravni podaci!");
            }
        }
    return zadaci;
      
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error; 
  }
}

export async function spremiZadatke(zadaci) {
  await writeFile('zadaci.json', JSON.stringify(zadaci, null, 2));
}
