import { AxiosResponse } from "axios";

import cheerio from 'cheerio';

class Parser {
    async parseBasicInfo(htmlString: AxiosResponse) {
        const $ = cheerio.load(htmlString);

        const student = {
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

        return student;
    }
}

export { Parser };