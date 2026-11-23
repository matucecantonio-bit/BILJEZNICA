
import { readFile, writeFile } from 'node:fs/promises';

// Ucitavanje zadataka
export async function ucitajZadatke() {
    try {
        const podaci = await readFile('zadaci.json', 'utf8');
        const zadaci = JSON.parse(podaci);

        if (!Array.isArray(zadaci)) {
            throw new Error('Neispravni podaci!');
        }

        for (const z of zadaci) {
            if (
                !z ||
                !Number.isInteger(z.id) ||
                typeof z.naslov !== 'string' ||
                typeof z.gotovo !== 'boolean'
            ) {
                throw new Error('Neispravni podaci!');
            }
        }

        return zadaci;

    } catch (greska) {
        if (greska.code === 'ENOENT') {
            return [];
        }

        throw new Error('Datoteka zadataka nije ispravna!');
    }
}

// Spremanje zadataka
export async function spremiZadatke(zadaci) {
    await writeFile('zadaci.json', JSON.stringify(zadaci, null, 4));
}
