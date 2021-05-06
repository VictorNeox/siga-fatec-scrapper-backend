import { AxiosResponse } from "axios";

import cheerio from 'cheerio';

class Parser {

    async parseLogin(htmlString: AxiosResponse) {
        const $ = cheerio.load(htmlString);

        const isCredentialsValid = $('#span_vSAIDA');

        return isCredentialsValid.html() != 'Não confere Login e Senha';
    }

    async parseBasicInfo(htmlString: AxiosResponse) {
        const $ = cheerio.load(htmlString);

        if (!parseInt($('span[id$="vACD_ALUNOCURSOCICLOATUAL"]').text().trim())) {
            throw new Error('Usuário não encontrado.');
        }


        const basicInformation = {
            name: $('span[id$="PRO_PESSOALNOME"]').text().split(' -')[0],
            birthday: $('span[id$="vPRO_PESSOALDATANASCIMENTO"]').text(),
            ra: $('span[id$="ALUNOCURSOREGISTROACADEMICOCURSO"]').text(),
            profilePicture: $('div[id$="FOTO"]').children().first().attr('src'),
            course: $('span[id$="_vACD_CURSONOME_MPAGE"]').text(),
            currentSemester: parseInt($('span[id$="vACD_ALUNOCURSOCICLOATUAL"]').text().trim()),
            attendedSemesters: parseInt($('span[id$="vSEMESTRESCURSADOS"]').text().trim()),
            remainingSemestes: parseInt($('span[id$="vFALTA"]').text().trim()),
            maxSemesters: parseInt($('span[id$="vINTEGRALIZACAOMAX"]').text().trim()),
            progress: parseFloat($('span[id$="_vACD_ALUNOCURSOINDICEPP"]').text().replace(',', '.')),
            average: parseFloat($('span[id$="_vACD_ALUNOCURSOINDICEPR"]').text().replace(',', '.')),
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

            subjects.push({
                name: subject[5],
                initials: subject[4],
                average: parseFloat(subject[10].replace(',', '.')),
                absences: parseInt(subject[15]),
                frequency: parseFloat(subject[20].replace(',', '.')),
                tests: testsNames
            });
        });

        return subjects;
    }

    async parseHistory(htmlString: AxiosResponse) {
        const $ = cheerio.load(htmlString);

        const history = [];

        const subjectsList = JSON.parse($('input[name="Grid1ContainerDataV"]').attr('value'));

        subjectsList.forEach((subject) => {
            history.push({
                initials: subject[0],
                name: subject[1],
                finalAverage: parseFloat(subject[4].trim()) || 0.0,
                frequency: parseFloat(subject[5].trim().split('%')[0]) || 0.0,
                observation: subject[6]
            });
        });

        return history;
    }
}

export { Parser };