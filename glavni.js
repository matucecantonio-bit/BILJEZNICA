
import { ucitajZadatke, spremiZadatke } from './pohrana.js';

const APP_NAME = "Konzolna bilježnica";
console.log(`== ${APP_NAME} ==`);

const naredba = process.argv[2];
const argument = process.argv[3];

async function pokreni() {
    try {
        const zadaci = await ucitajZadatke();

        switch (naredba) {

            case 'dodaj': {
                if (!argument) {
                    throw new Error('Upisite naziv zadatka!');
                }

                const id = zadaci.length + 1;

                zadaci.push({
                    id: id,
                    naslov: process.argv.slice(3).join(' '),
                    gotovo: false
                });

                await spremiZadatke(zadaci);
                console.log('Zadatak je dodan!');
                break;
            }

            case 'popis': {
                if (zadaci.length === 0) {
                    console.log('Nema zadataka.');
                }

                for (const z of zadaci) {
                    console.log(`${z.id}. [${z.gotovo ? 'x' : ' '}] ${z.naslov}`);
                }

                break;
            }

            case 'gotovo': {
                const z = zadaci.find(z => z.id === Number(argument));

                if (!z || !/^[1-9]\d*$/.test(argument || '')) {
                    throw new Error('Zadatak ne postoji!');
                }

                z.gotovo = true;

                await spremiZadatke(zadaci);
                console.log('Zadatak je gotov!');
                break;
            }

            default:
                throw new Error('Nepoznata naredba!');
        }

    } catch (greska) {
        console.log('Greska: ' + greska.message);
        process.exit(1);
    }
}

pokreni();