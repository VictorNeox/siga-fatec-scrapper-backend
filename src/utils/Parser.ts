import { AxiosResponse } from "axios";

import cheerio, { html } from 'cheerio';

class Parser {
    async parseBasicInfo(htmlString: AxiosResponse) {
        const $ = cheerio.load(htmlString);

        const basicInformation = {
            name: $('span[id$="PRO_PESSOALNOME"]').text().split(' -')[0],
            birthday: $('span[id$="vPRO_PESSOALDATANASCIMENTO"]').text(),
            ra: $('span[id$="ALUNOCURSOREGISTROACADEMICOCURSO"]').text(),
            profilePicture: $('div[id$="FOTO"]').children().first().attr('src'),
            course: $('span[id$="_vACD_CURSONOME_MPAGE"]').text(),
            currentSemester: $('span[id$="vACD_ALUNOCURSOCICLOATUAL"]').text().trim(),
            attendedSemesters: $('span[id$="vSEMESTRESCURSADOS"]').text().trim(),
            remainingSemestes: $('span[id$="vFALTA"]').text().trim(),
            maxSemesters: $('span[id$="vINTEGRALIZACAOMAX"]').text().trim(),
            progress: $('span[id$="_vACD_ALUNOCURSOINDICEPP"]').text(),
            average: $('span[id$="_vACD_ALUNOCURSOINDICEPR"]').text(),
        };
        return basicInformation;
    }

    async parseSubjects(htmlString: AxiosResponse) {
        const $ = cheerio.load(htmlString);

        const subjects = [];

        const teste = JSON.parse($('input[name="Grid3ContainerDataV"]').attr('value'));

        let counter = 0;

        teste.forEach(subject => {
            counter++;
            let subjectId = counter.toString().padStart(4, '0');

            const tests = JSON.parse($(`input[name="Grid2ContainerDataV_${subjectId}"]`).attr('value'));
            const testsNames = [];


            tests.forEach((test, index) => {
                const score = (index + 1).toString().padStart(4, '0');
                const testScore = JSON.parse($(`input[name="Grid1ContainerDataV_${score}${subjectId}"]`).attr('value'));

                testsNames.push({
                    name: test[8],
                    score: (testScore[0]) ? parseFloat(testScore[0][0].replace(',', '.')) : 0.0
                });
            });

            console.log(testsNames)

            subjects.push({
                name: subject[5],
                initials: subject[4],
                average: subject[10],
                absences: subject[15],
                frequency: subject[20],
                tests
            });
        });
    }
}

export { Parser };