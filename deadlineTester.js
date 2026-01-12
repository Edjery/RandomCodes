// Debug values
// Feel free to change the debug values
// Online compiler: https://www.programiz.com/javascript/online-compiler/
// Terminal run command: node deadlineTester.js

const DEBUG_MODE = true // shows variables
const USE_SOLUTION_FUNCTION = true // defaults to original function if false

const originalFunction = (deadline, added_when) => {
    const result = new Date(deadline) <= new Date(added_when);
    return result;
}
const solutionFunction = (deadline, added_when) => {
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(23, 59, 59, 999);
    const addedWhenDate = new Date(added_when);
    
    const result = deadlineDate <= addedWhenDate;
    return result;
}
const testerFunction = (solutionFunction) => {
    const testValues = [
        {
            tag: "Same day – before deadline (should PASS)",
            deadline: "2023-03-29",
            submissionDate: "2023-03-29 08:00:00",
            expectedValue: false
        },
    
        {
            tag: "Same day – exactly at midnight",
            deadline: "2023-03-29",
            submissionDate: "2023-03-29 00:00:00",
            expectedValue: false
        },
    
        {
            tag: "Same day – last second before deadline",
            deadline: "2023-03-29",
            submissionDate: "2023-03-29 23:59:59",
            expectedValue: false
        },
    
        {
            tag: "Next day – late submission",
            deadline: "2023-03-29",
            submissionDate: "2023-03-30 00:00:00",
            expectedValue: true
        },
    
        {
            tag: "One second after deadline",
            deadline: "2023-03-29",
            submissionDate: "2023-03-30 00:00:01",
            expectedValue: true
        },
    
        {
            tag: "Previous day – early submission",
            deadline: "2023-03-29",
            submissionDate: "2023-03-28 23:59:59",
            expectedValue: false
        },
    
        {
            tag: "Far future submission",
            deadline: "2023-03-29",
            submissionDate: "2023-04-10 12:00:00",
            expectedValue: true
        },
    
        {
            tag: "Far past submission",
            deadline: "2023-03-29",
            submissionDate: "2023-01-01 10:00:00",
            expectedValue: false
        },

        {
            tag: "Leap year – valid date",
            deadline: "2024-02-29",
            submissionDate: "2024-02-29 23:59:59",
            expectedValue: false
        },
    
        {
            tag: "Leap year – late",
            deadline: "2024-02-29",
            submissionDate: "2024-03-01 00:00:00",
            expectedValue: true
        }
    ];
        
    let score = 0;
    testValues.forEach((test, index) => {
        const result = solutionFunction(test.deadline, test.submissionDate);
        result === test.expectedValue ? score += 1 : score += 0;
        const assessment = result === test.expectedValue ? "✅ PASS" : "❌ FAIL"
    
        console.log("-----------------------------------------------------");
        console.log(`${index + 1})`, test.tag)
        console.log(assessment)

        DEBUG_MODE && console.log(
                `  +===============================================+\n`,
                ` |                  DEBUG DATA:                  |\n`,
                ` +===============================================+\n`,
                ` |   Deadline:        ${test.deadline.padEnd(27)}|\n`,
                ` |   Submission Date: ${test.submissionDate.padEnd(27)}|\n`,
                ` |   Result:          ${String(result).padEnd(27)}|\n`,
                ` |   Expected:        ${String(test.expectedValue).padEnd(27)}|\n`,
                ` |   ${ (result
                    ? "Report is over the deadline"
                    : "Report is passed before the deadline"
                ).padEnd(44) }|\n`,
                ` +===============================================+`
        );
    });
    console.log("-----------------------------------------------------");
    console.log(`Score: ${score}/${testValues.length}`);
}
const main = () => {
    if (USE_SOLUTION_FUNCTION) {
        console.log("[+]===========[+] SOLUTION FUNCTION [+]===========[+]");
        testerFunction(solutionFunction);
    } else {
        console.log("[+]===========[+] ORIGINAL FUNCTION [+]===========[+]");
        testerFunction(originalFunction);
    }
}

main();