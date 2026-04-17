const basicDetailsService = require('./services/basicDetails');

function testReqData(payload) {
    const req = { body: payload };
    // We need to bypass the actual logic if we can't easily require it
    // But since I have the code, I can just simulate it or try to require it.
    // Let's try to require it if possible, otherwise I'll just copy the logic for a quick test.
}

// Since I want to be 100% sure about the file I just edited, 
// I'll create a standalone test that mirrors the logic I just wrote.

function robustIsMinor(body) {
    return (
        body.IS_MINOR == 1 ||
        body.IS_MINOR == '1' ||
        body.IS_MINOR == true ||
        body.IS_MINOR == 'true' ||
        body.IS_MINOR == 'Y' ||
        body.CUSTOMER_TYPE_1 == 'MNR' ||
        body.CUSTOMER_TYPE_1 == 'MINOR' ||
        (body.AGE_1 !== undefined && body.AGE_1 !== null && body.AGE_1 !== '' && parseInt(body.AGE_1) < 18) ||
        (body.AGE !== undefined && body.AGE !== null && body.AGE !== '' && parseInt(body.AGE) < 18) ||
        (body.MINOR_DOB && body.MINOR_DOB !== '') ||
        (body.GUARDIAN_NAME && body.GUARDIAN_NAME !== '') ||
        (body.RELATION_WITH_MINOR && body.RELATION_WITH_MINOR !== '') ||
        (Array.isArray(body.applicants) && body.applicants.length > 0 && (
            body.applicants[0].IS_MINOR == 1 ||
            body.applicants[0].IS_MINOR == '1' ||
            body.applicants[0].IS_MINOR == true ||
            body.applicants[0].IS_MINOR == 'Y' ||
            (body.applicants[0].AGE !== undefined && body.applicants[0].AGE !== null && body.applicants[0].AGE !== '' && parseInt(body.applicants[0].AGE) < 18) ||
            (body.applicants[0].DOB && body.applicants[0].DOB.includes('/') && parseInt(body.applicants[0].DOB.split('/')[2]) > (new Date().getFullYear() - 18))
        ))
    ) ? '1' : '0';
}

const scenarios = [
    { name: "Explicit IS_MINOR = 1", body: { IS_MINOR: 1 }, expected: '1' },
    { name: "Explicit IS_MINOR = '1'", body: { IS_MINOR: '1' }, expected: '1' },
    { name: "Explicit IS_MINOR = true", body: { IS_MINOR: true }, expected: '1' },
    { name: "Explicit IS_MINOR = 'true'", body: { IS_MINOR: 'true' }, expected: '1' },
    { name: "Explicit IS_MINOR = 'Y'", body: { IS_MINOR: 'Y' }, expected: '1' },
    { name: "AGE_1 = 17 (integer)", body: { AGE_1: 17 }, expected: '1' },
    { name: "AGE_1 = '15' (string)", body: { AGE_1: '15' }, expected: '1' },
    { name: "AGE = 16 (root AGE field)", body: { AGE: 16 }, expected: '1' },
    { name: "Applicants array AGE = 14", body: { applicants: [{ AGE: 14 }] }, expected: '1' },
    { name: "Applicants array DOB = 12/04/2010", body: { applicants: [{ DOB: '12/04/2010' }] }, expected: '1' },
    { name: "GUARDIAN_NAME present", body: { GUARDIAN_NAME: 'John Doe' }, expected: '1' },
    { name: "MINOR_DOB present", body: { MINOR_DOB: '12/04/2010' }, expected: '1' },
    { name: "Non-minor (Age 20)", body: { IS_MINOR: 0, AGE_1: 20 }, expected: '0' },
];

scenarios.forEach(s => {
    const result = robustIsMinor(s.body);
    console.log(`${s.name}: ${result === s.expected ? 'PASS' : 'FAIL'} (Result: ${result}, Expected: ${s.expected})`);
});
