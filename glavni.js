import { ucitajZadatke, spremiZadatke } from "./pohrana.js";

const APP_NAME = "Konzolna bilježnica";
console.log(`== ${APP_NAME} ==`);

const [naredba, argument] = process.argv.slice(2);

try {
  const zadaci = await ucitajZadatke();

  switch (naredba) {
    case "dodaj": {
      if (!argument || !argument.trim() === "") {
        console.error("Nedostaje naslov zadatka.");
        process.exit(1);
      }

     let noviId = 1;
    if (zadaci.length > 0) {
      noviId = Math.max(...zadaci.map((z) => z.id)) + 1;
    }

    const noviZadatak = {
      id: noviId,
      naslov: argument.trim(),
      gotovo: false,
    };

    zadaci.push(noviZadatak);
    await spremiZadatke(zadaci);

    console.log(`Dodan zadatak [${noviId}]: ${noviZadatak.naslov}`);
    break;
    }

    case "popis":
      if (zadaci.length === 0) {
        console.log("Nema zadataka.");
      } else {
        zadaci.forEach(z =>
          console.log(`${z.id}. ${z.gotovo ? "[x]" : "[ ]"} ${z.naslov}`)
        );
      }
      break;

    case "gotovo": {
      const id = Number(argument);
      const zadatak = zadaci.find(z => z.id === id);

      if (!argument || !Number.isInteger(id) || id <= 0 || !zadatak) {
        console.error("Neispravan broj zadatka.");
        process.exit(1);
      }

      zadatak.gotovo = true;
      await spremiZadatke(zadaci);

      console.log(`Zadatak ${id} označen kao gotov.`);
      break;
    }

    default:
      console.error("Nepoznata naredba. Koristi: dodaj, popis, gotovo.");
      process.exit(1);
  }
} catch (error) {
  console.error("Greška:", error.message);
  process.exit(1);
}
