let file1, file2;

//checking plagiarism sentence by sentence
async function plagiarismChecker(text1, text2) {
    try {
        // Split texts into sentences
        const sentences1 = text1.split(/[.!?]/).map(sentence => sentence.trim()).filter(sentence => sentence !== '').map(sentence => sentence.toUpperCase());
        const sentences2 = text2.split(/[.!?]/).map(sentence => sentence.trim()).filter(sentence => sentence !== '').map(sentence => sentence.toUpperCase());

        console.log(sentences1, sentences2)
        // Calculate the total number of sentences in the first text
        const totalSentences1 = sentences1.length;
        const totalSentences2 = sentences2.length;

        const totalSentences = Math.min(totalSentences1, totalSentences2)

        // Count the number of matching sentences between the two texts
        const matchingSentences = sentences1.filter(sentence1 => sentences2.includes(sentence1)).length;

        // Calculate the plagiarism percentage based on the number of matching sentences
        const plagiarismPercentage = (matchingSentences / totalSentences) * 100;

        return plagiarismPercentage + ' % similarity found.';
    } catch (error) {
        throw error;
    }
}

document.getElementById('checkBtn').addEventListener('click', () => {
    file1 = document.getElementById('output1').value;
    file2 = document.getElementById('output2').value;
    plagiarismChecker(file1, file2)
        .then(similarity => {
            if (similarity !== null) {
                console.log('Similarity between the texts:', similarity);
                document.getElementById('result').innerText = similarity;
            }
        })
        .catch(err => console.error('Error:', err));
}
)

async function getFile1() {
    // Open file picker and destructure the result the first handle
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const text = await file.text();
    document.getElementById('output1').value = text;
    file1 = text;
}
async function getFile2() {
    // Open file picker and destructure the result the first handle
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const text = await file.text();
    document.getElementById('output2').value = text;
    file2 = text;
}

