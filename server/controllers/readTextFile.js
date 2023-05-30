import fs from "fs";

// Huffman Encoding

class Node {
    constructor(char, freq, left, right) {
      this.char = char;
      this.freq = freq;
      this.left = left;
      this.right = right;
    }
}

function calculateFrequency(text) {
    const frequency = new Map();
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (frequency.has(char)) {
        frequency.set(char, frequency.get(char) + 1);
      } else {
        frequency.set(char, 1);
      }
    }
    return frequency;
  }

  // Construct the Huffman tree
function constructHuffmanTree(frequency) {
    const priorityQueue = [];
    for (const [char, freq] of frequency.entries()) {
      priorityQueue.push(new Node(char, freq, null, null));
    }
    while (priorityQueue.length > 1) {
      priorityQueue.sort((a, b) => a.freq - b.freq);
      const left = priorityQueue.shift();
      const right = priorityQueue.shift();
      const parentFreq = left.freq + right.freq;
      const parent = new Node(null, parentFreq, left, right);
      priorityQueue.push(parent);
    }
    return priorityQueue[0];
  }

// Generate Huffman codes
function generateHuffmanCodes(root, currentCode, codes) {
    if (root.char) {
      codes.set(root.char, currentCode);
    } else {
      generateHuffmanCodes(root.left, currentCode + '0', codes);
      generateHuffmanCodes(root.right, currentCode + '1', codes);
    }
  }
  
  // Compress the input text using Huffman codes
function compressText(text, codes) {
    let compressedText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      compressedText += codes.get(char);
    }
    return compressedText;
  }


// @desc Read the uploaded text File
// @route POST /upload

export const readTextFile = (req, res) => {
    console.log(req.file);
    fs.readFile(req.file.path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading the file.' });	
        }

        const frequency = calculateFrequency(data);
        const huffmanTree = constructHuffmanTree(frequency);
        const codes = new Map();
        generateHuffmanCodes(huffmanTree, '', codes);
        const compressedText = compressText(data, codes);

        const response = {
            // originalText: data,
            compressedText: compressedText,
            codes: Array.from(codes.entries())
          };
        

        const outputFile = 'public/downloads/compressed.txt';
        const fileContent = JSON.stringify(response);

        fs.writeFile (outputFile, fileContent, 'utf8', (err) => {
            if (err) {
                return res.status(500).send({ message: 'Error creating the compressed file.' });
            }


            return res.status(200).send({ 
                message: 'Compressed file generated successfully.', 
                originalText: data,
                compressedText: compressedText,
                codes: Array.from(codes.entries())
            });	
        
        });
    });
};