import AegisReport from 'aegis-report';

// declare global {
//     interface Window { AEGIS_REPORT: object; }
// }

const aegis =  {
    init: function () {
        if (!('AEGIS_REPORT' in window)) {
            const AEGIS_REPORT = new AegisReport({
                id: 356,
                offlineLog: true,
                offlineLogAuto: true
            });
            window['AEGIS_REPORT'] = AEGIS_REPORT;
        }
    }
}

export default aegis;
